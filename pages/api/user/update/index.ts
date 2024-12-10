import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import sharp from "sharp";
import { connectMongoDB } from "../../libs/mongodb";
import User from "../../models/User";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { description, likedIn, instagram, yt } = req.body;

  const uploadHandler = upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]);

  uploadHandler(req as any, res as any, async (err: any) => {
    if (err) {
      return res.status(500).json({ message: "File upload error" });
    }

    try {
      await connectMongoDB();

      const updates: any = { description, likedIn, instagram, yt };

      if (req.files?.profilePicture) {
        const buffer = await sharp(req.files.profilePicture[0].buffer)
          .resize(160, 160)
          .jpeg({ quality: 80 })
          .toBuffer();
        updates.profilePicture = buffer.toString("base64");
      }

      if (req.files?.coverPhoto) {
        const buffer = await sharp(req.files.coverPhoto[0].buffer)
          .resize(1200, 600)
          .jpeg({ quality: 80 })
          .toBuffer();
        updates.coverPhoto = buffer.toString("base64");
      }

      await User.findByIdAndUpdate(req.user._id, updates);
      res.status(200).json({ message: "Profile updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred." });
    }
  });
}
