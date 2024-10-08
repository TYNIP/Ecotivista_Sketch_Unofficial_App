import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Article from '../../models/articles'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      
      const newArticle = new Article({
        sections: req.body,
        createdAt: new Date(),
      });
      
      await newArticle.save();
      res.status(201).json({ message: 'Article created' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save article' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
