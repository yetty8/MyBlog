// backend/scripts/createIndexes.js
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('../models/Post');

async function createIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    
    // Create text index
    await Post.collection.createIndex({
      title: 'text',
      content: 'text',
      tags: 'text'
    }, {
      weights: {
        title: 10,
        tags: 5,
        content: 1
      },
      name: 'text_search_index'
    });
    
    console.log('Indexes created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating indexes:', error);
    process.exit(1);
  }
}

createIndexes();