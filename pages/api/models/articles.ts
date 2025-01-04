import mongoose, { Schema, model, models } from 'mongoose';

const SectionSchema = new Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
});

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  description: { type: String, required: true, maxlength: 500 },
  tags: { type: [String], default: [], maxlength: 10 },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now },
});


const Article = models.Article || model('Article', ArticleSchema);

export default Article;
