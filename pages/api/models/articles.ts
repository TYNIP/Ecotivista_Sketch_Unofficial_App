const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'subtitle', 'actionButton', 'quote', 'footer'],
    required: true
  },
  content: {
    type: String,
    required: function() {
      return this.type === 'text' || this.type === 'quote'; 
    }
  },
  src: {
    type: String,
    required: function() {
      return this.type === 'image';
    }
  },
  alt: {
    type: String
  },
  url: {
    type: String,
    required: function() {
      return this.type === 'actionButton';
    }
  },
  footerHtml: {
    type: String,
    required: function() {
      return this.type === 'footer';
    }
  }
});

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['project', 'extracurricular'], 
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  content: {
    type: [ContentSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'] 
  }
});

function arrayLimit(val) {
  return val.length <= 50;
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;