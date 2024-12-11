import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ISocialMedia {
  linkedIn?: string;
  instagram?: string;
  youtube?: string;
}

export interface IUser {
  _id?: ObjectId | string | undefined;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  userLogStatus: boolean;
  description?: string;
  socialMedia?: ISocialMedia;
  profilePicture?: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' };
  coverPhoto?: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' };
}

export interface IUserSchema extends Document {
  _id?: ObjectId | string | undefined;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  userLogStatus: boolean;
  description?: string;
  socialMedia?: ISocialMedia;
  profilePicture?: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' };
  coverPhoto?: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' };
}

const SocialMediaSchema: Schema = new Schema({
  linkedIn: { type: String, required: false },
  instagram: { type: String, required: false },
  youtube: { type: String, required: false },
});

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userLogStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    socialMedia: {
      type: SocialMediaSchema,
      required: false,
    },
    profilePicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'uploads.files',
      required: false,
    },
    coverPhoto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'uploads.files',
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUserSchema>("User", UserSchema);
export default User;
