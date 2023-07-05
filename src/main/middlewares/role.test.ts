import request from 'supertest';
import { afterAll, beforeAll, describe, test } from 'vitest';

import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import app from '@main/config/app';
import env from '@main/config/env';
import prisma from '@main/config/prisma';
import { ensureAuthenticated } from './auth';
import { is } from './role';

describe('Role Middleware', () => {
  let token = '';

  beforeAll(async () => {
    await prisma.$connect();
    const account = await prisma.account.create({
      data: {
        email: 'email@example.com',
        password: 'password',
      },
    });
    const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
    token = await tokenizer.sign(account.id);
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.$disconnect();
  });

  test('should not be authorized if role is not allowed', async () => {
    app.post(
      '/test_role_middleware_admin',
      ensureAuthenticated,
      is(['ADMIN']),
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_role_middleware_admin')
      .send()
      .set('authorization', `Bearer ${token}`)
      .expect(401);
  });

  test('should be authorized if role is allowed', async () => {
    app.post(
      '/test_role_middleware_user',
      ensureAuthenticated,
      is(['USER']),
      (mockRequest, mockResponse) => {
        mockResponse.send(mockRequest.body);
      }
    );
    await request(app)
      .post('/test_role_middleware_user')
      .send()
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });
});
