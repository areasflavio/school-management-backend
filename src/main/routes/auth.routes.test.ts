import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import app from '@main/config/app';
import prisma from '@main/config/prisma';

const makeAccountRouteBody = (ignoredAttr?: string) => {
  const fakeAccount: any = {
    email: 'email@example.com',
    password: 'password',
    passwordConfirmation: 'password',
  };

  const filteredKeys = Object.keys(fakeAccount).filter(
    (key) => !ignoredAttr || key !== ignoredAttr
  );

  return Object.assign(
    {},
    filteredKeys.reduce((acc: any, key) => {
      acc[key] = fakeAccount[key];
      return acc;
    }, {})
  );
};

describe('Accounts Routes', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.account.deleteMany();
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /sign-up', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .post('/api/sign-up')
        .send(makeAccountRouteBody('passwordConfirmation'))
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await request(app).post('/api/sign-up').send(makeAccountRouteBody());
      await request(app)
        .post('/api/sign-up')
        .send(makeAccountRouteBody())
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/sign-up')
        .send(makeAccountRouteBody())
        .expect(201);
    });
  });
});
