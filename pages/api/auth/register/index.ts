import { connectMongoDB } from '../../libs/mongodb';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { msg } from '../../utils/msg';
import { isValidEmail } from '../../utils/isValidEmail';
import User from '../../models/UserModel';
import Token from '../../models/Tokens';
import jwt from 'jsonwebtoken';
import { sanitizeInput } from '../../utils/sanitizeInput';
import crypto from 'crypto'; 

const { SECRET } = require('../../config');

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    let { email, password, confirmPassword, username, name, lastname, tokenId } = req.body;

    // Sanitize inputs
    email = sanitizeInput(email);
    username = sanitizeInput(username).toUpperCase();
    name = sanitizeInput(name);
    lastname = sanitizeInput(lastname);

    // Fields validation
    if (!email || !password || !confirmPassword || !username || !name || !lastname || !tokenId) {
      return res.status(400).json({ message: msg.error.needProps });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: msg.error.emailNotValid });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: msg.error.pwdNotMatch });
    }

    // Password strength validation
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      return res.status(400).json({ message: msg.error.weakPassword });
    }

    // Check if token is valid and active
    const tokenRecord = await Token.findOne({ token: `${tokenId}`, status: 'active' });
    if (!tokenRecord) {
      return res.status(400).json({ message: msg.error.invalidToken });
    }

    // Check if email or username exists
    if (await User.findOne({ email }) || await User.findOne({ username })) {
      return res.status(400).json({ message: msg.error.usernameExists });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate device-specific hash (using User-Agent and IP address)
    const userAgent = req.headers['user-agent'] || ''; 
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''; // Get the user's IP

    const deviceHash = crypto
      .createHash('sha256')
      .update(userAgent + ipAddress)
      .digest('hex');  // Create a hash of User-Agent and IP address

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      name,
      lastname,
      status: 'active',
      token: tokenId,
    });

    //@ts-ignore
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // Create JWT with device-specific hash in the payload
    const authToken = jwt.sign(
      { 
        data: userWithoutPassword, 
        deviceHash: deviceHash, 
        iss: 'Ecotivista', 
        aud: 'EcotivistaUsers' 
      },
      SECRET,
      { expiresIn: `${12 * 60}m` }
    );

    // Save user
    //@ts-ignore
    await newUser.save();

    // Set secure cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth_cookie', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 12 * 60 * 60 * 1000, 
        path: '/',
      })
    );

    res.status(200).json({
      newUser: userWithoutPassword,
      message: msg.success.userCreated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: msg.error.default });
  }
}
