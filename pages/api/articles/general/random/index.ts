import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles';
import { msg } from '../../../utils/msg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { page = 1, limit = 10 } = req.query;
  
    try {
      await connectMongoDB();
  
      const totalArticlesCount = await Article.countDocuments();
      const articles = await Article.aggregate([
        { $sample: { size: parseInt(limit as string, 10) } },
      ])
        .skip((parseInt(page as string, 10) - 1) * parseInt(limit as string, 10))
        .limit(parseInt(limit as string, 10));
  
      const hasMore = articles.length === parseInt(limit as string, 10); 
  
      return res.status(200).json({ articles, hasMore });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: msg.error.default,
      });
    }
  }
  