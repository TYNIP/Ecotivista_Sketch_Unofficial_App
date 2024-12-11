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

// MongoDB connection setup
const { SECRET } = require('../../config');
let gfs: Grid.GridFSBucket | null = null;

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
  

  const saveImageToGridFS = async (filePath: string, filename: string) => {
    if (!gfs) {
      throw new Error("GridFS is not initialized. Check MongoDB connection.");
    }
  
    console.log("Uploading file to GridFS:", filePath, filename);
  
    const fileStream = fs.createReadStream(filePath);
    const uploadStream = gfs.openUploadStream(filename);
  
    console.log("UploadStream created:", uploadStream.id); 
  
    return new Promise((resolve, reject) => {
      fileStream.on('error', (err) => {
        console.error("Error reading file stream:", err);
        reject(err);
      });
  
      uploadStream.on('error', (err) => {
        console.error("Error during GridFS upload:", err);
        reject(err);
      });
  
      uploadStream.on('finish', (file: any) => {
        console.log("GridFS upload completed. File details:", file); 
        resolve(file); 
      });
  
      fileStream.pipe(uploadStream);
    });
  };
  
  

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.token as string | undefined;
    if (!token) {
      return res.status(400).json({
        message: msg.error.notAuthorized,
      });
    }

    try {
      const isTokenValid = jwt.verify(token, SECRET);
      //@ts-ignore
      const { data } = isTokenValid;

      await connectMongoDB();
      await initGridFS();

      console.log("Is gfs initialized? ", !!gfs);
      if (!gfs) {
        throw new Error("GridFS is not initialized. Check MongoDB connection.");
      }
      


      const user = await User.findById(data._id);
      if (!user) {
        return res.status(400).json({
          message: msg.error.userNotFound,
        });
      }

      const form = formidable({ multiples: true });
      //@ts-ignore
      const { fields, files } = await new Promise((resolve, reject) => {
        //@ts-ignore
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const updates: any = {
        description: fields.description[0],
        socialMedia: {
          linkedIn: fields.linkedIn[0],
          instagram: fields.instagram[0],
          youtube: fields.yt[0],
        },
      };


      // Handle profilePicture upload

      console.log(files.profilePicture)
      if (files.profilePicture) {
        const profilePicturePath = files.profilePicture[0].filepath;
        const profilePictureName = `${Date.now()}_profile.jpg`;
        const tempProcessedPath = `${profilePicturePath}_processed.jpg`; // Temporary output file
      
        try {
          // Process the image with Sharp
          await sharp(profilePicturePath)
            .resize(160, 160)
            .jpeg({ quality: 80 })
            .toFile(tempProcessedPath);
      
          // Upload the processed image to GridFS
          const fileStream = fs.createReadStream(tempProcessedPath); // Use fs.createReadStream here
          const uploadedProfilePicture = await saveImageToGridFS(tempProcessedPath, profilePictureName);
          console.log("Uploaded Profile Image ID:", uploadedProfilePicture);
      
          updates.profilePicture = uploadedProfilePicture._id; // Store the file ID reference in MongoDB
        } catch (err) {
          console.error("Error processing or uploading profile picture:", err);
          throw err;
        } finally {
          // Clean up temporary files
          await fsPromises.unlink(profilePicturePath).catch((err) =>
            console.warn("Error deleting original file:", err)
          );
          await fsPromises.unlink(tempProcessedPath).catch((err) =>
            console.warn("Error deleting processed file:", err)
          );
        }
      }
      
      

      // Handle coverPhoto upload
      if (files.coverPhoto) {
        const coverPhotoPath = files.coverPhoto[0].filepath;
        const coverPhotoName = `${Date.now()}_background.jpg`;

        await sharp(coverPhotoPath)
          .resize(1200, 600)
          .jpeg({ quality: 80 })
          .toFile(coverPhotoPath); // Resize the image before uploading to GridFS

        const uploadedcoverPhoto = await saveImageToGridFS(coverPhotoPath, coverPhotoName);
        updates.coverPhoto = uploadedcoverPhoto._id; // Store the file ID reference in MongoDB

        await fs.unlink(coverPhotoPath); // Delete the temporary file after uploading
      }

      // Update the user document with new data
      console.log("update", updates);
      await User.findByIdAndUpdate(data._id, updates, { new: true });

      return res.status(200).json({ message: msg.success.updated });
    } catch (err) {
        console.log(err)
      return res.status(500).json({
        message: msg.error.tokenNotValid,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: msg.error.default,
    });
  }
}
