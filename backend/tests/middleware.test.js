import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import Post from '../models/Post.js';

// Create a mock ID that doesn't depend on mongoose inside the mock
const mockUserId = new mongoose.Types.ObjectId().toString();

// Mock auth middleware
jest.mock('../middleware/auth.js', () => ({
  protect: (req, res, next) => {
    req.user = { id: mockUserId };
    next();
  }
}));

// Test data
const testPost = {
  title: 'Test Post',
  content: 'This is a test post',
  tags: ['test'],
  author: mockUserId
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Post.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Middleware', () => {
  describe('Authentication Middleware', () => {
    it('should protect routes with valid token', async () => {
      const post = new Post(testPost);
      await post.save();
      
      const res = await request(app)
        .get(`/api/posts/${post._id}`);
      
      expect(res.statusCode).not.toBe(401);
    });
  });
});