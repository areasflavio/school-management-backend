import path from 'path';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import app from '@main/config/app';
import env from '@main/config/env';
import prisma from '@main/config/prisma';

const filePath = path.resolve(__dirname, '..', '..', '__tests__');

describe('Students Routes', async () => {
  let userToken = '';
  let adminToken = '';
  let requestApp = (await import('supertest')).default(app);

  beforeAll(async () => {
    await prisma.$connect();
    const userAccount = prisma.account.create({
      data: {
        email: 'user@example.com',
        password: 'password',
        role: 'USER',
      },
    });
    const adminAccount = prisma.account.create({
      data: {
        email: 'admin@example.com',
        password: 'password',
        role: 'ADMIN',
      },
    });
    const account = await prisma.$transaction([userAccount, adminAccount]);
    const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
    userToken = await tokenizer.sign(account[0].id);
    adminToken = await tokenizer.sign(account[1].id);
  });

  beforeEach(async () => {
    await prisma.student.deleteMany();
    requestApp = (await import('supertest')).default(app);
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.student.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /alunos', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .post('/api/alunos')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .field('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .field('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(201);
    });
  });

  describe('GET /alunos', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .get('/api/alunos')
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /alunos/:id', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const student = await prisma.student.findFirst();
      await requestApp
        .get('/api/alunos/' + student?.id)
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /alunos/email/:email', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const student = await prisma.student.findFirst();
      await requestApp
        .get('/api/alunos/email/' + student?.email)
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('PUT /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .put('/api/alunos/' + 'id')
        .field('nome', 'nome')
        .field('email', 'email@example.com')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/alunos')
        .field('matricula', 123)
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('serie', 'serie')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('emailResponsavel', 'emailResponsavel@example.com')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const student = await prisma.student.findFirst();
      await requestApp
        .put('/api/alunos/' + student?.id)
        .field('nome', 'nome atualizado')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('DELETE /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .delete('/api/alunos/' + 'id')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await prisma.student.create({
        data: {
          matricula: 123,
          nome: 'nome',
          status: 'ATIVO',
          serie: 'serie',
          email: 'student@example.com',
          nascimento: new Date('2000-01-01').toISOString(),
          sexo: 'MASCULINO',
          endereco: 'endereco',
          emailResponsavel: 'emailResponsavel@example.com',
        },
      });
      const student = await prisma.student.findFirst();
      await requestApp
        .delete('/api/alunos/' + student?.id)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });
});
