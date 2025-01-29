import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { msg } from '../../utils/msg';
import User from '../../models/UserModel';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cookie from 'cookie';

const { SECRET } = require('../../config');

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = req.headers.cookie;
        const parsedCookies = cookies ? cookie.parse(cookies) : {};
        const token = parsedCookies.auth_cookie;

        if (!token) {
            return res.status(400).json({
                message: msg.error.notAuthorized,
            });
        }

        try {
            const isTokenValid = jwt.verify(token, SECRET);
            //@ts-ignore
            const { data } = isTokenValid;
            await connectMongoDB();

            const user = await User.findById(data._id).select('-password');
            if (!user) {
                return res.status(400).json({
                    message: msg.error.userNotFound,
                });
            }

            // Transform GridFS ObjectId into a public URL
            const transformFileIdToUrl = (fileId: mongoose.Types.ObjectId | undefined) => {
                if (!fileId) return null;
                return `/api/files/${fileId.toString()}`;
            };

            const userWithUrls = {
                ...user.toObject(),
                profilePicture: transformFileIdToUrl(user.profilePicture),
                coverPhoto: transformFileIdToUrl(user.coverPhoto),
            };

            return res.status(200).json(userWithUrls);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: msg.error.tokenNotValid,
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: msg.error.default,
        });
    }
}
