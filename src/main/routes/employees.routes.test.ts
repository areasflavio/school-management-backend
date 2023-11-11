import path from 'path';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import app from '@main/config/app';
import env from '@main/config/env';
import prisma from '@main/config/prisma';

const filePath = path.resolve(__dirname, '..', '..', '__tests__');

describe('Employees Routes', async () => {
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
    await prisma.employee.deleteMany();
    requestApp = (await import('supertest')).default(app);
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /funcionarios', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .post('/api/funcionarios')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .field('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .field('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`)
        .expect(201);
    });
  });

  describe('GET /funcionarios', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .get('/api/funcionarios')
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /funcionarios/:id', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const employee = await prisma.employee.findFirst();
      await requestApp
        .get('/api/funcionarios/' + employee?.id)
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /funcionarios/email/:email', () => {
    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const employee = await prisma.employee.findFirst();
      await requestApp
        .get('/api/funcionarios/email/' + employee?.email)
        .set('authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('PUT /funcionarios/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .put('/api/funcionarios/' + 'id')
        .field('nome', 'nome')
        .field('email', 'email@example.com')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await requestApp
        .post('/api/funcionarios')
        .field('nome', 'nome')
        .field('status', 'ATIVO')
        .field('email', 'email@example.com')
        .field('nascimento', new Date('2000-01-01').toISOString())
        .field('sexo', 'MASCULINO')
        .field('endereco', 'endereco')
        .field('admissao', new Date('2023-01-01').toISOString())
        .field('cargo', 'PROFESSOR')
        .field('CPF', 'cpf')
        .field('escolaridade', 'DOUTORADO')
        .field('registro', 123)
        .field('RG', 'rg')
        .field('vinculo', 'CONCURSADO')
        .attach('file', `${filePath}/file.png`)
        .set('authorization', `Bearer ${adminToken}`);
      const employee = await prisma.employee.findFirst();
      await requestApp
        .put('/api/funcionarios/' + employee?.id)
        .field('nome', 'nome atualizado')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('DELETE /funcionarios/:id', () => {
    test('should return 400 on failure', async () => {
      await requestApp
        .delete('/api/funcionarios/' + 'id')
        .set('authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await prisma.employee.create({
        data: {
          nome: 'nome',
          status: 'ATIVO',
          email: 'email@example.com',
          nascimento: new Date('2000-01-01'),
          sexo: 'MASCULINO',
          endereco: 'endereco',
          admissao: new Date('2023-01-01'),
          cargo: 'PROFESSOR',
          CPF: 'cpf',
          escolaridade: 'DOUTORADO',
          registro: 123,
          RG: 'rg',
          vinculo: 'CONCURSADO',
        },
      });
      const employee = await prisma.employee.findFirst();
      await requestApp
        .delete('/api/funcionarios/' + employee?.id)
        .send()
        .set('authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });
});
