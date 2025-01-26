import { connectMongoDB } from '../../libs/mongodb';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { msg } from '../../utils/msg';
import { isValidEmail } from '../../utils/isValidEmail';
import { sanitizeInput } from '../../utils/sanitizeInput';
import User, { IUserSchema } from '../../models/User';
import jwt from 'jsonwebtoken';
const { SECRET } = require('../../config');
import crypto from 'crypto'; 

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongoDB();

    // Sanitize inputs
    let { email, password } = req.body;
    email = sanitizeInput(email);
    password = sanitizeInput(password);

    // Fields validation
    if (!email || !password) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: msg.error.emailNotValid,
      });
    }

    // FIND USER
    const userFind = await User.findOne({ email });
    if (!userFind) {
      return res.status(400).json({
        message: msg.error.userNotFound,
      });
    }

    // Check if user is banned
    if (userFind.status === "banned") {
      return res.status(403).json({
        message: msg.error.userBanned,
      });
    }

    // Validate password
    const isCorrect: boolean = await bcrypt.compare(password, userFind.password);
    if (!isCorrect) {
      return res.status(400).json({
        message: msg.error.incorrect,
      });
    }

    // Exclude password from response
    // @ts-ignore
    const { password: userPass, ...rest } = userFind._doc;

    // Generate device-specific hash (using User-Agent and IP address)
        const userAgent = req.headers['user-agent'] || ''; 
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''; // Get the user's IP
    
        const deviceHash = crypto
          .createHash('sha256')
          .update(userAgent + ipAddress)
          .digest('hex');  // Create a hash of User-Agent and IP address

    // Generate secure session token
    const authToken = jwt.sign(
      { 
        data: rest, 
        deviceHash: deviceHash, 
        iss: 'Ecotivista', 
        aud: 'EcotivistaUsers' 
      },
      SECRET,
      { expiresIn: '15m' }
    );

    // Set secure cookie with token
    res.setHeader('Set-Cookie', cookie.serialize('auth_cookie', authToken, {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true, 
      sameSite: 'strict',
      maxAge: 15 * 60, 
      path: '/', 
    }));

    // Update user login status
    userFind.userLogStatus = true;
    await userFind.save();

    // Endpoint Response
    res.status(200).json({
      userFind: rest,
      message: msg.success.userLogged,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
