import {connectMongoDB} from '../libs/mongodb'; 
import Announcement from '../models/Announcements';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();
    try {
      const announcements = await Announcement.find({});
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch announcements' });
    }
}