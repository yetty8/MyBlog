// backend/routes/posts.js
const express = require('express');
const { query, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

// Input validation for search and pagination
const validateSearchAndPagination = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('q').optional().trim().escape(),
  query('sort').optional().isIn(['newest', 'oldest', 'title']).withMessage('Invalid sort option'),
  query('tags').optional().isString().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Get ALL posts with search, filter, and pagination
router.get("/", validateSearchAndPagination, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.q || '';
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    
    // Build the query
    let query = {};
    
    // Text search
    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }
    
    // Filter by tags if provided
    if (tags.length > 0) {
      query.tags = { $in: tags };
    }
    
    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (req.query.sort === 'title') {
      sortOption = { title: 1 };
    }
    
    // Get total count for pagination
    const total = await Post.countDocuments(query).exec();
    
    // Get paginated results
    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email')
      .exec();
    
    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: posts
    });
    
  } catch (err) {
    console.error('Error fetching posts:', err);
    next(err);
  }
});

// Get ONE post by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name email')
      .populate('comments');
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Error fetching post:', err);
    next(err);
  }
});
// Debug route to list all posts with slugs
router.get("/debug/all", async (req, res, next) => {
  try {
    const posts = await Post.find({}, 'title slug').lean();
    res.json({
      success: true,
      count: posts.length,
      posts: posts
    });
  } catch (err) {
    console.error('Debug error:', err);
    next(err);
  }
});
module.exports = router;