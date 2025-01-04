import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../models/articles';
import User from '../../models/User';
import { msg } from '../../utils/msg';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();

    const { id, limit } = req.query;

    if (!id) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    const query = { author: id };
    const options = limit ? { limit: parseInt(limit as string, 10) } : {};
    let articlesObj = await Article.find(query, null, options).exec();
    
    const user = await User.findById(id).exec(); 
    const username = user?.username; 
    
    let articles = articlesObj.map(article => article.toObject());
    articles = articles.map(obj => {
        obj.username = username; 
        return obj;
    });

    res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({
      message: msg.error.default,});
  }
}
