import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../models/articles';
import User from '../../models/User';
import { msg } from '../../utils/msg';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();

    const id = "6799b36e8c952d01b4bfdd61";
    const limit = "10";

    const query = { author: id };
    const options = limit ? { limit: parseInt(limit as string, 10) } : {};
    let articlesObj = await Article.find(query, null, options)
    .sort({ createdAt: -1 }) 
    //@ts-ignore
    .skip((parseInt(1, 10) - 1) * parseInt(limit as string, 10))
    .limit(parseInt(limit as string, 10));
    
    const user = await User.findById(id).exec()
    
    const username = user?.username; 
    
    let articles = articlesObj.map(article => article.toObject());
    articles = articles.map(obj => {
        obj.username = username; 
        return obj;
    });

    res.status(200).json({articles});
  } catch (err) {
    return res.status(500).json({
      message: msg.error.default,});
  }
}
