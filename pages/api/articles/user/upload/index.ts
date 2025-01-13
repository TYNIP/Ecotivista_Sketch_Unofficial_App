import { connectMongoDB } from '../../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../models/articles'; 
import User from '../../../models/User';
import { msg } from '../../../utils/msg';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
const MAX_LINKS = 10;
const MAX_LINK_TEXT_LENGTH = 50;
const MAX_ARTICLE_SIZE = 5 * 1024 * 1024; // 5 KB in bytes

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();

    const { title, author, description, tags, sections } = req.body;

    if (!title || !author || !description || !tags || !sections) {
      return res.status(400).json({
        message: msg.error.needProps,
      });
    }

    if (title.length > 70) {
      return res.status(400).json({
        message: "Title exceeds the maximum length of 70 characters.",
      });
    }

    if (description.length > 500) {
      return res.status(400).json({
        message: "Description exceeds the maximum length of 500 characters.",
      });
    }

    // Check tags
    if (!Array.isArray(tags) || tags.length > 10) {
      return res.status(400).json({
        message: "Tags must be an array with a maximum of 10 items.",
      });
    }

    // Check sections
    let totalArticleSize = 0;
    let linkCount = 0;

    sections.forEach((section: any) => {
      const { type, content, image, links } = section;

      // Subtitle length
      if (type === "subtitle" && content.length > 200) {
        return res.status(400).json({
          message: "Subtitles exceed the maximum length of 200 characters.",
        });
      }
      console.log("1")
      // Ensure content is a string before calculating its size
      if (content && typeof content === 'string') {
        totalArticleSize += Buffer.byteLength(content, 'utf-8');
      } else if (content) {
        // If content is an object, handle it appropriately (e.g., stringify)
        totalArticleSize += Buffer.byteLength(JSON.stringify(content), 'utf-8');
      }

      // Image size validation (ensure it's an object with a 'size' property)
      if (image && image.size && image.size > MAX_IMAGE_SIZE) {
        return res.status(400).json({
          message: `Image size in section ${section.type} exceeds 5 MB.`,
        });
      }
console.log("2")
      // Links validation
      if (links && Array.isArray(links)) {
        linkCount += links.length;
        links.forEach((link: any) => {
          if (link.text && link.text.length > MAX_LINK_TEXT_LENGTH) {
            return res.status(400).json({
              message: `Link text exceeds the maximum length of ${MAX_LINK_TEXT_LENGTH} characters.`,
            });
          }
        });
      }
    });
    console.log("3")
    // Check link count
    if (linkCount > MAX_LINKS) {
      return res.status(400).json({
        message: `The article contains more than the maximum allowed ${MAX_LINKS} links.`,
      });
    }
    console.log("4")
    // Check total article size
    if (totalArticleSize > MAX_ARTICLE_SIZE) {
      return res.status(400).json({
        message: `The total article size exceeds the maximum allowed ${MAX_ARTICLE_SIZE / 1024} KB.`,
      });
    }

    // Validate author
    const userNameFind = await User.findOne({ username: author }).exec();
    if (!userNameFind) {
      return res.status(400).json({
        message: msg.error.userNotFound,
      });
    }

    // Save article
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
