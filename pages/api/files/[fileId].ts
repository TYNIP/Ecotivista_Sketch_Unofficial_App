import { connectMongoDB } from '../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectMongoDB();
        const { fileId } = req.query;

        if (!fileId || typeof fileId !== 'string') {
            return res.status(400).json({ message: 'File ID is required.' });
        }

        const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
        const fileStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        fileStream.on('error', (err) => {
            console.error(err);
            res.status(404).json({ message: 'File not found.' });
        });

        fileStream.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving file.' });
    }
}
