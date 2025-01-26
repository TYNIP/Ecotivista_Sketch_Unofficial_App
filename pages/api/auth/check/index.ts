import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { msg } from '../../utils/msg';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import crypto from 'crypto'; 

const { SECRET } = require('../../config');

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let token;

    if (req.headers.token) {
      token = req.headers.token;
    } else {
      const cookies = req.headers.cookie;
      const parsedCookies = cookies ? cookie.parse(cookies) : {};
      token = parsedCookies.auth_cookie;
    }

    if (!token) {
      return res.status(400).json({ message: msg.error.notAuthorized });
    }

    try {
      //@ts-ignore
      const isTokenValid = jwt.verify(token, SECRET);
      //@ts-ignore
      const { data, exp, deviceHash: tokenDeviceHash } = isTokenValid;

      // Check if token is nearing expiration
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      //@ts-ignore
      const timeRemaining = exp - currentTime;

      if (timeRemaining < 5 * 60) { // Less than 5 minutes remaining
        const newToken = jwt.sign({ data, deviceHash: tokenDeviceHash }, SECRET, { expiresIn: '15m' });

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth_cookie', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
            path: '/',
          })
        );
      }

      // Validate the current device's User-Agent and IP address to ensure it's the same device
      const userAgent = req.headers['user-agent'] || '';
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''; // Get the user's IP

      const currentDeviceHash = crypto
        .createHash('sha256')
        .update(userAgent + ipAddress)
        .digest('hex');

      if (tokenDeviceHash !== currentDeviceHash) {
        return res.status(401).json({
          message: 'Device mismatch. Unauthorized access.',
          isAuthorized: false,
        });
      }

      // Validate user in the database
      await connectMongoDB();
      const userFind = await User.findById(data._id);

      if (!userFind) {
        return res.status(400).json({
          message: msg.error.userNotFound,
        });
      }

      res.status(200).json({
        isAuthorized: true,
        message: msg.success.authorized,
        email: data.email,
        username: data.username,
        id: data._id,
      });
    } catch (err) {
      // Handle token expiration or invalid token
      return res.status(401).json({
        message: msg.error.tokenNotValid,
        isAuthorized: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
