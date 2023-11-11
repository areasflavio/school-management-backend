import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import app from '@main/config/app';
import env from '@main/config/env';
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

describe('Accounts Routes', async () => {
  const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
  let adminToken = '';
  let requestApp = (await import('supertest')).default(app);

  beforeAll(async () => {
    await prisma.$connect();
    const adminAccount = await prisma.account.create({
      data: {
        email: 'admin@example.com',
        password: 'password',
        role: 'ADMIN',
      },
    });
    adminToken = await tokenizer.sign(adminAccount.id);
  });

  beforeEach(async () => {
    await prisma.account.deleteMany();
    requestApp = (await import('supertest')).default(app);
    const adminAccount = await prisma.account.create({
      data: {
        email: 'admin@example.com',
        password: 'password',
        role: 'ADMIN',
      },
    });
    adminToken = await tokenizer.sign(adminAccount.id);
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /usuarios', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .send(makeAccountRouteBody());
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .send(makeAccountRouteBody())
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .send(makeAccountRouteBody())
        .expect(201);
    });
  });

  describe('GET /usuarios', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .get('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('GET /usuarios/:id', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .send(makeAccountRouteBody());
      const account = await prisma.account.findFirst();
      await requestApp
        .get('/api/usuarios/' + account?.id)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('PUT /usuarios/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .put('/api/usuarios/' + 'id')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/usuarios')
        .set('authorization', `Bearer ${adminToken}`)
        .send(makeAccountRouteBody());
      const account = await prisma.account.findFirst();
      await requestApp
        .put('/api/usuarios/' + account?.id)
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          password: 'new-password',
        })
        .expect(200);
    });
  });

  describe('DELETE /usuarios/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .delete('/api/usuarios/' + 'id')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await prisma.account.create({
        data: makeAccountRouteBody('passwordConfirmation'),
      });
      const account = await prisma.account.findFirst();
      await requestApp
        .delete('/api/usuarios/' + account?.id)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });
});
