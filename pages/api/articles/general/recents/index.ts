import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles';
import User from '../../../models/user'; // Assuming this is the User model
import { msg } from '../../../utils/msg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    await connectMongoDB();

    const articles = await Article.aggregate([
      { $sort: { createdAt: -1 } }, // Sort by most recent
      {
        $lookup: {
          from: 'users', // The collection name for the User model
          localField: 'author', // Field in Article referencing User's _id
          foreignField: '_id', // Field in User being referenced
          as: 'authorDetails', // Field to store the matched user document
        },
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true, // If no matching user is found, keep null
        },
      },
      {
        $addFields: {
          username: '$authorDetails.username', // Add username at the top level
        },
      },
      {
        $project: {
          authorDetails: 0, // Remove the nested authorDetails object
        },
      },
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
