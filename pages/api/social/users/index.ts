import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { msg } from '../../utils/msg';
import User from '../../models/UserModel';
import mongoose from 'mongoose';
import { revertPathName } from '@/components/functions';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectMongoDB();
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({
            message: msg.error.needProps,
        });
        }

            await connectMongoDB();
            //@ts-ignore
            const user = await User.findOne({username: revertPathName(username)}).select('-password');
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
            message: msg.error.default,
        });
    }
}
