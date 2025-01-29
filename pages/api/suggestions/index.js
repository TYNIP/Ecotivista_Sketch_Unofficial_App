import { connectMongoDB } from '../libs/mongodb';
import Suggestions from '../models/Suggestions';
import Articles from '../models/articles';
import User from '../models/UserModel'; // Assuming the User model is named User

export default async function handler(req, res) {
  try {
    await connectMongoDB();

    // Step 1: Fetch all suggestions
    const suggestions = await Suggestions.find({});
    
    // Step 2: Extract article IDs from suggestions
    const articleIds = suggestions.map((s) => s.articleId); 

    // Step 3: Find articles using the extracted article IDs
    const articles = await Articles.find({ _id: { $in: articleIds } });

    // Step 4: Fetch usernames for the authors of these articles
    const authors = await User.find({ _id: { $in: articles.map((article) => article.author) } });

    // Step 5: Create a map of author ID to username for quick lookups
    const authorMap = authors.reduce((acc, user) => {
      acc[user._id.toString()] = user.username;
      return acc;
    }, {});

    // Step 6: Add the username to each article
    const articlesWithUsername = articles.map((article) => ({
      ...article.toObject(), // Convert article document to plain object
      username: authorMap[article.author.toString()] || null, // Add username or null if not found
    }));

    res.status(200).json({ success: true, articles: articlesWithUsername });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
