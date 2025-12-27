const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('../models/Post');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    await connectDB();
    console.log('Dropping existing text index if it exists...');
    try {
      await Post.collection.dropIndex('text_search_index');
      console.log('Dropped existing text index');
    } catch (dropErr) {
      console.log('No existing text index to drop');
    }
    
    console.log('Creating new text index...');
    await Post.createIndexes();
    console.log('Text index created successfully');
    
    // Verify the index was created
    const indexes = await Post.collection.indexes();
    console.log('Current indexes:', indexes.map(idx => {
      const { key, name, weights } = idx;
      return { key, name, weights };
    }));
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating indexes:', err);
    process.exit(1);
  }
};

createIndexes();