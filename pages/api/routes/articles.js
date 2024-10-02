const express = require('express');
const router = express.Router();
const Article = require('../models/articles');

/* ARTICLES ROUTE */
module.exports = (app)=>{
    app.use('/articles', router);

    // Routes
    router.post('/', async (req, res) => {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).send(article);
    } catch (err) {
      console.log('an error: :c', err)
      res.status(400).send(err);
    }
  });
  // Search articles by text or tags
  router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    try {
      const articles = await Article.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } }, 
          { author: { $regex: searchTerm, $options: 'i' } }, 
          { tags: { $in: [searchTerm] } } 
        ]
      }).limit(10);
  
      res.json(articles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Get the five latest articles
router.get('/latest', async (req, res) => {
    try {
      const articles = await Article.find().sort({ publishedDate: -1 }).limit(5);
      res.send(articles);
    } catch (err) {
      console.log('err',err);
      res.status(500).send(err);
    }
  });

router.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const articles = await Article.find({ type });
    res.send(articles);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


}