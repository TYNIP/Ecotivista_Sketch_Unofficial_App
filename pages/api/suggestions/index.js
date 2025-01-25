
import {connectMongoDB} from '../libs/mongodb';
import Suggestions from '../models/Suggestions';
import Articles from '../models/articles';

export default async function handler(req, res) {
  try {
    await connectMongoDB();

    const suggestions = await Suggestions.find({});
    const articleIds = suggestions.map((s) => s.articleId); 


    const articles = await Articles.find({ _id: { $in: articleIds } });

    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
