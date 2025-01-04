import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../models/articles';
import User from '../../models/User';
import { msg } from '../../utils/msg';
import { use } from 'react';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    console.log("hay00000000000000000000000o")
    const { id } = req.query;
    console.log("hell000", id);

    if (!id) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    let articleObj = await Article.findById(id).exec();
    const username = await User.findById(articleObj.author).exec();
    let article = articleObj.toObject(); 
    article.username = username.username;

    if (!article) {
      return res.status(404).json({
        message: msg.error.notFound,
      });
    }

    console.log("all article",article);
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
