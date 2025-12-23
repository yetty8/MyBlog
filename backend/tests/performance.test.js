import request from 'supertest';
import { app } from '../server.js';
import { performance } from 'perf_hooks';

describe('Performance Testing', () => {
  it('should handle 100 requests in under 5 seconds', async () => {
    const numRequests = 100;
    const start = performance.now();
    
    const requests = Array(numRequests).fill().map(() => 
      request(app).get('/api/posts')
    );
    
    const responses = await Promise.all(requests);
    const end = performance.now();
    const duration = end - start;
    
    console.log(`Processed ${numRequests} requests in ${duration}ms`);
    expect(duration).toBeLessThan(5000); // 5 seconds
    
    // Verify all responses were successful
    responses.forEach(response => {
      expect(response.statusCode).toBe(200);
    });
  }, 10000);
});