import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles';
import { msg } from '../../../utils/msg';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const { query, filter, page = 1, limit = 10 } = req.query;

    if (!query || !filter) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    const filters = {
      title: { title: { $regex: query, $options: 'i' } },
      description: { description: { $regex: query, $options: 'i' } },
      tags: { tags: { $in: [query] } },
    };

    //@ts-ignore
    if (!filters[filter]) {
      return res.status(400).json({
        message: msg.error.invalidFilter,
      });
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    //@ts-ignore
    const articles = await Article.aggregate([
      { $match: filters[filter] }, // Match the filter conditions
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
      .skip(skip)
      .limit(parseInt(limit as string));

    //@ts-ignore
    const totalArticles = await Article.countDocuments(filters[filter]).exec();
    const hasMore = skip + articles.length < totalArticles;

    if (articles.length === 0) {
      return res.status(404).json({
        message: msg.error.notFound,
      });
    }

    res.status(200).json({
      articles,
      hasMore,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
