import { connectMongoDB } from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { msg } from '../../utils/msg';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import formidable from 'formidable';
import sharp from 'sharp';
import fs from 'fs';
import fsPromises from 'fs/promises';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
const UserModel = User;

const { SECRET } = require('../../config');
let gfs: Grid.GridFSBucket | null = null;

// Configure API to disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize GridFS
const initGridFS = async () => {
  if (!mongoose.connection.readyState) {
    throw new Error("Mongoose connection is not established.");
  }

  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
  console.log("GridFS initialized:", gfs);
};

// Save image to GridFS
const saveImageToGridFS = async (filePath: string, filename: string) => {
  if (!gfs) {
    throw new Error("GridFS is not initialized. Check MongoDB connection.");
  }

  console.log("Uploading file to GridFS:", filePath, filename);

  const fileStream = fs.createReadStream(filePath);
  const uploadStream = gfs.openUploadStream(filename);

  return new Promise((resolve, reject) => {
    fileStream.on('error', (err) => {
      console.error("Error reading file stream:", err);
      reject(err);
    });

    uploadStream.on('error', (err) => {
      console.error("Error during GridFS upload:", err);
      reject(err);
    });

    uploadStream.on('finish', () => {
      console.log("GridFS upload completed.");
      // Return file ID from the upload stream
      resolve(uploadStream.id);
    });

    fileStream.pipe(uploadStream);
  });
};


// Process image using Sharp
const processImage = async (filePath: string, outputPath: string, width: number, height: number) => {
  try {
    await sharp(filePath).resize(width, height).jpeg({ quality: 80 }).toFile(outputPath);
  } catch (err) {
    console.error("Error processing image:", err);
    throw err;
  }
};

// Handle file upload and return the GridFS file ID
const handleFileUpload = async (files: any) => {
  const updates: any = {};

  // Process and upload profile picture
  if (files.profilePicture) {
    const profilePicturePath = files.profilePicture[0].filepath;
    const profilePictureName = `${Date.now()}_profile.jpg`;
    const tempProcessedPath = `${profilePicturePath}_processed.jpg`;

    try {
      await sharp(profilePicturePath)
        .resize(160, 160)
        .jpeg({ quality: 80 })
        .toFile(tempProcessedPath);

      const uploadedProfilePictureId = await saveImageToGridFS(tempProcessedPath, profilePictureName);
      console.log("Uploaded Profile Picture ID:", uploadedProfilePictureId);

      updates.profilePicture = uploadedProfilePictureId; // Store file ID in updates
    } catch (err) {
      console.error("Error processing or uploading profile picture:", err);
      throw err;
    } finally {
      await fsPromises.unlink(profilePicturePath).catch((err) =>
        console.warn("Error deleting original file:", err)
      );
      await fsPromises.unlink(tempProcessedPath).catch((err) =>
        console.warn("Error deleting processed file:", err)
      );
    }
  }

  // Process and upload cover photo
  if (files.coverPhoto) {
    const coverPhotoPath = files.coverPhoto[0].filepath;
    const coverPhotoName = `${Date.now()}_background.jpg`;
    const tempProcessedPath = `${coverPhotoPath}_processed.jpg`;

    try {
      await sharp(coverPhotoPath)
        .resize(1200, 600)
        .jpeg({ quality: 80 })
        .toFile(tempProcessedPath);

      const uploadedCoverPhotoId = await saveImageToGridFS(tempProcessedPath, coverPhotoName);
      console.log("Uploaded Cover Photo ID:", uploadedCoverPhotoId);

      updates.coverPhoto = uploadedCoverPhotoId; // Store file ID in updates
    } catch (err) {
      console.error("Error processing or uploading cover photo:", err);
      throw err;
    } finally {
      await fsPromises.unlink(coverPhotoPath).catch((err) =>
        console.warn("Error deleting original file:", err)
      );
      await fsPromises.unlink(tempProcessedPath).catch((err) =>
        console.warn("Error deleting processed file:", err)
      );
    }
  }

  return updates;
};


// API handler
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.token as string | undefined;
    if (!token) {
      return res.status(400).json({ message: msg.error.notAuthorized });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, SECRET);
    //@ts-ignore
    const { data } = decoded;

    // Connect to MongoDB and initialize GridFS
    await connectMongoDB();
    await initGridFS();

    // Fetch user data
    const user = await User.findById(data._id);
    if (!user) {
      return res.status(404).json({ message: msg.error.userNotFound });
    }

    // Parse the form data
    const form = formidable({ multiples: true });
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Prepare user updates
    const updates: any = {
      description: fields.description[0],
      socialMedia: {
        linkedIn: fields.linkedIn[0],
        instagram: fields.instagram[0],
        youtube: fields.yt[0],
      },
    };

    // Handle profile and cover images upload
    try {
      const updates = await handleFileUpload(files);
      console.log("File uploads processed. Updates:", updates);
    
      // Save updates in the user's database record
      await UserModel.updateOne({ _id: user._id }, { $set: updates });
      res.status(200).send({ success: true, message: "Files uploaded successfully", updates });
    } catch (err) {
      console.error("Error handling file upload:", err);
      res.status(500).send({ success: false, message: "File upload failed", error: err.message });
    }
    

    // Update user document
    await User.findByIdAndUpdate(data._id, updates, { new: true });

    return res.status(200).json({ message: msg.success.updated });
  } catch (err) {
    console.error("Error in POST handler:", err);
    return res.status(500).json({ message: msg.error.default });
  }
}
