import { connectMongoDB } from "../../../libs/mongodb";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import Article from "../../../models/articles";
import cookie from 'cookie';
const { SECRET } = require("../../../config");

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? cookie.parse(cookies) : {};
    const token = parsedCookies.auth_cookie;
    await connectMongoDB();
    if (req.method !== "DELETE") {
      return res.status(405).json({ message: "Method not allowed." });
    }

    // Check auth_cookie
    const authCookie = token;
    if (!authCookie) {
      return res.status(401).json({ message: "Authentication required." });
    }

    // Verify the JWT
    let decodedToken;
    try {
      decodedToken = jwt.verify(authCookie, SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Extract user ID from the token
    const userId = decodedToken?.data?._id;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user credentials." });
    }

    // Extract article ID from request body
    const { articleId } = req.body;
    if (!articleId) {
      return res.status(400).json({ message: "Article ID is required." });
    }

    // Find the article by ID
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    // Verify article ownership
    if (article.author.toString() !== userId) {
      return res.status(403).json({ message: "You do not have permission to delete this article." });
    }

    // Delete article
    await Article.findByIdAndDelete(articleId);

    res.status(200).json({ message: "Article successfully deleted." });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
}
