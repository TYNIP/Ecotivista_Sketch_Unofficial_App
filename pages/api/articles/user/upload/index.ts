/* CREATE ARTICLE */
import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles'; 
import User from '../../../models/User';
import { msg } from '../../../utils/msg';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {

  try {
    await connectMongoDB();

    const { title, author, description, tags, sections } = req.body;

    if (!title || !author || !description || !tags || !sections) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    if (title.length > 50) {
      return res.status(400).json({
        message: "Title exceeds the maximum length of 50 characters.",
      });
    }

    if (description.length > 500) {
      return res.status(400).json({
        message: "Description exceeds the maximum length of 500 characters.",
      });
    }

    sections.forEach((section: any) => {
      if (section.type === "subtitle" && section.content.length > 200) {
        return res.status(400).json({
          message: "Subtitles exceed the maximum length of 200 characters.",
        });
      }
    });

    if (!Array.isArray(tags) || tags.length > 10) {
      return res.status(400).json({
        message: "Tags must be an array with a maximum of 10 items.",
      });
    }

    const userNameFind = await User.findOne({ username: author }).exec();
    if (!userNameFind) {
      return res.status(400).json({
        message: msg.error.userNotFound,
      });
    }

    const newArticle = new Article({
      title,
      author: userNameFind._id,
      description,
      tags,
      sections,  
      createdAt: new Date(),
    });

    await newArticle.save();

    res.status(200).json({
      message: msg.success.articleCreated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
