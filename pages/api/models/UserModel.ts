import mongoose, { Schema, model, models } from "mongoose";

const SocialMediaSchema = new Schema({
  linkedIn: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  tiktok: { type: String },
});

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive", "banned"], default: "active" },
  token: { type: String, required: true },
  userLogStatus: { type: Boolean, default: false },
  description: { type: String },
  socialMedia: SocialMediaSchema,
  profilePicture: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
  coverPhoto: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
