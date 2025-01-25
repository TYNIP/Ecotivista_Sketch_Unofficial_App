import { connectMongoDB } from '../../libs/mongodb';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { msg } from '../../utils/msg';
import { isValidEmail } from '../../utils/isValidEmail';
import User, { IUserSchema } from '../../models/User';
import Token from '../../models/Tokens'; 
import jwt from 'jsonwebtoken';
const { SECRET } = require('../../config');

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    let { email, password, confirmPassword, username, name, lastname, tokenId } = req.body;
    username = username.toUpperCase();

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

    // Check if token is valid and active
    const tokenRecord = await Token.findOne({ token: `${tokenId}`, status: 'active' });
    if (!tokenRecord) {
      return res.status(400).json({ message: msg.error.invalidToken });
    }

    // Check if email or username exists
    const userFind = await User.findOne({ email });
    if (userFind) {
      return res.status(400).json({ message: msg.error.emailExists });
    }

    const userNameFind = await User.findOne({ username });
    if (userNameFind) {
      return res.status(400).json({ message: msg.error.usernameExists });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser: IUserSchema = new User({
      email,
      password: hashedPassword,
      username,
      name,
      lastname,
      status: 'active',
      token: tokenId,
    });

    // Exclude password from response
    // @ts-ignore
    const { password: userPass, ...rest } = newUser._doc;

    // Create JWT
    const authToken = jwt.sign({ data: rest }, SECRET, { expiresIn: 24 * 60 * 60 });

    // Save user and set cookie
    await newUser.save();

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth_cookie', authToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60,
        path: '/',
      })
    );

    // Update user log status
    const userLogStatus = await User.findOne({ email });
    if (!userLogStatus) {
      return res.status(400).json({ message: msg.error.userNotFound });
    }

    userLogStatus.userLogStatus = true;
    await userLogStatus.save();

    // Endpoint response
    res.status(200).json({
      newUser: rest,
      message: msg.success.userCreated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: msg.error.default });
  }
}
