import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  username: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);