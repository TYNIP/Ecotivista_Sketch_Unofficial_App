import mongoose from 'mongoose';

const SuggestionSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Suggestion || mongoose.model("Suggestion", SuggestionSchema);