/* CREATE ARTICLE */
import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles'; 
import User, {IUserSchema} from '../../../models/User';
import { msg } from '../../../utils/msg';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const { title, author, sections } = req.body;

    const userNameFind = await User.findOne({author});
        if(!userNameFind){
            return res.status(400).json({
                message: msg.error.userNotFound,
            })
        }

    console.log(userNameFind);

    // Validate required fields
    if (!title || !author || !sections || !Array.isArray(sections)) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    // Validate sections content
    for (const section of sections) {
      if (!section.type || !['text', 'image', 'video'].includes(section.type)) {
        return res.status(400).json({
          message: msg.error.invalidSectionType,
        });
      }
      if (!section.content) {
        return res.status(400).json({
          message: msg.error.invalidSectionContent,
        });
      }
    }

    // Save the article in the database
    const newArticle = new Article({
      title,
      author: userNameFind._id,
      sections,
      createdAt: new Date(),
    });

    const savedArticle = await newArticle.save();

    // Response
    res.status(200).json({
      message: msg.success.articleCreated,
      article: savedArticle,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
