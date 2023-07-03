import request from 'supertest';
import { describe, test } from 'vitest';

import app from '@main/config/app';
import { ensureAuthenticated } from './auth';

describe('Auth Middleware', () => {
  test('should not be authenticated if "authorization" header is not provided', async () => {
    app.post(
      '/test_auth_middleware',
      ensureAuthenticated,
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app).post('/test_auth_middleware').send().expect(403);
  });

  test('should not be authenticated if no token is provided', async () => {
    app.post(
      '/test_auth_middleware',
      ensureAuthenticated,
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_auth_middleware')
      .set('authorization', '')
      .send()
      .expect(403);
  });

  test('should be authenticated if a valid token is provided', async () => {
    app.post(
      '/test_auth_middleware',
      ensureAuthenticated,
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_auth_middleware')
      .set('authorization', 'Bearer token')
      .send()
      .expect(200);
  });
});
