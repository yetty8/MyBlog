// backend/scripts/seedPosts.js
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
require('dotenv').config();

const samplePosts = [
  {
    title: 'Getting Started with Node.js',
    content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 engine. It allows you to build scalable network applications using JavaScript on the server side. In this post, we\'ll explore the basics of setting up a Node.js application, including package management with npm, creating a simple HTTP server, and handling basic routing. We\'ll also cover some best practices for structuring your Node.js applications.',
    tags: ['nodejs', 'javascript', 'backend'],
    author: null, // Will be set after creating a test user
    status: 'published'
  },
  {
    title: 'Introduction to Express.js',
    content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this tutorial, we\'ll cover the fundamentals of Express.js, including routing, middleware, template engines, and error handling. You\'ll learn how to create a basic web server, handle different HTTP methods, and organize your application using the MVC pattern.',
    tags: ['express', 'nodejs', 'web'],
    author: null,
    status: 'published'
  },
  {
    title: 'MongoDB Basics for Beginners',
    content: 'MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB uses collections and documents instead of tables and rows. In this guide, we\'ll cover the basics of MongoDB, including CRUD operations, data modeling, indexing, and aggregation. We\'ll also look at how to interact with MongoDB using the native Node.js driver and Mongoose ODM.',
    tags: ['mongodb', 'database', 'nosql'],
    author: null,
    status: 'published'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('🧹 Cleared existing posts');

    // Create a test user if not exists
    let user = await User.findOne({ email: 'test@example.com' });
   if (!user) {
  user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser',  // Added this line
    password: 'password123',
    role: 'admin'
  });
  console.log('👤 Created test user');
}

    // Add user ID to posts
    const postsWithAuthor = samplePosts.map(post => ({
      ...post,
      author: user._id
    }));

    // Insert sample posts
    const createdPosts = await Post.insertMany(postsWithAuthor);
    console.log(`🌱 Seeded ${createdPosts.length} posts`);

    // Create text index if it doesn't exist
    await Post.collection.createIndex(
      { title: 'text', content: 'text', tags: 'text' },
      {
        weights: { title: 10, tags: 5, content: 1 },
        name: 'text_search_index'
      }
    );
    console.log('🔍 Created text index for search');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();