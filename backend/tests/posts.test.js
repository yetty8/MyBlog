import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import Post from '../models/Post.js';

// Test data
const testPost = {
  title: 'Test Post for Search',
  content: 'This is a test post content for search functionality testing.',
  tags: ['test', 'search', 'pagination'],
  author: new mongoose.Types.ObjectId(),
  status: 'published'
};

let testPostId;

// Clear the test database before each test
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Post.deleteMany({});
  const post = await Post.create(testPost);
  testPostId = post._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Posts API', () => {
  describe('GET /api/posts', () => {
    it('should return paginated posts', async () => {
      const res = await request(app)
        .get('/api/posts')
        .query({ page: 1, limit: 5 });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty('page', 1);
      expect(res.body).toHaveProperty('total');
    }, 10000);

    it('should search posts by text', async () => {
      const res = await request(app)
        .get('/api/posts')
        .query({ q: 'search functionality' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000);

    it('should filter posts by tags', async () => {
      const res = await request(app)
        .get('/api/posts')
        .query({ tags: 'test' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.some(post => post.tags.includes('test'))).toBe(true);
    }, 10000);
  });

  describe('GET /api/posts/:slug', () => {
    it('should return a post by slug', async () => {
      const post = await Post.findById(testPostId);
      const res = await request(app).get(`/api/posts/${post.slug}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data.title).toBe(testPost.title);
    }, 10000);

    it('should return 404 for non-existent post', async () => {
      const res = await request(app).get('/api/posts/non-existent-slug');
      expect(res.statusCode).toEqual(404);
    }, 10000);
  });
});