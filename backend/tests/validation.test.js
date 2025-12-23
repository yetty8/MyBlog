import request from 'supertest';
import { app } from '../server.js';

describe('Input Validation', () => {
  describe('User Registration', () => {
    it('should require all fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({});
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it('should validate email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'invalid-email',
          password: '123456',
          passwordConfirm: '123456'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors.some(e => e.msg.toLowerCase().includes('valid email'))).toBe(true);
    });

    it('should require matching passwords', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'different'
        });
      
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });
});