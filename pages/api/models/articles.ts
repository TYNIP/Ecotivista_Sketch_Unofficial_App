import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  sections: Array,
  createdAt: Date,
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
