const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../app'); // Import app directly
const User = require('../models/User');

const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  passwordConfirm: 'password123'
};

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });
  });
});