const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { q: searchQuery, tags, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build the query
    let query = { status: 'published' };

    // Enhanced Text search
    if (searchQuery) {
      // Split the search query into individual words and remove empty strings
      const searchTerms = searchQuery
        .split(/\s+/) // Split by whitespace
        .filter(term => term.length > 0)
        .map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')); // Escape regex special chars

      if (searchTerms.length > 0) {
        // Create an array of conditions for each search term
        const searchConditions = searchTerms.map(term => {
          const regex = new RegExp(term, 'i'); // Case insensitive
          return {
            $or: [
              { title: { $regex: regex } },
              { content: { $regex: regex } },
              { tags: { $in: [regex] } }
            ]
          };
        });

        // Use $and to require ALL search terms to match somewhere in the document
        query.$and = searchConditions;
      }
    }

    // Filter by tags if provided
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagsArray };
    }

    // Execute query with pagination
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('comments')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: posts
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts'
    });
  }
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name'
        }
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post'
    });
  }
});

module.exports = router;