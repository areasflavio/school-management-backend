import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import app from '@main/config/app';
import prisma from '@main/config/prisma';

const makeEmployeeRouteBody = (ignoredAttr?: string) => {
  const fakeEmployee: any = {
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
  };

  const filteredKeys = Object.keys(fakeEmployee).filter(
    (key) => !ignoredAttr || key !== ignoredAttr
  );

  return Object.assign(
    {},
    filteredKeys.reduce((acc: any, key) => {
      acc[key] = fakeEmployee[key];
      return acc;
    }, {})
  );
};

describe('Employees Routes', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  afterAll(async () => {
    await prisma.employee.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /funcionarios', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody('email'))
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token');
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token')
        .expect(201);
    });
  });

  describe('GET /funcionarios', () => {
    test('should return 200 on success', async () => {
      await request(app)
        .get('/api/funcionarios')
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('GET /funcionarios/:id', () => {
    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token');
      const employee = await prisma.employee.findFirst();
      await request(app)
        .put('/api/funcionarios/' + employee?.id)
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('PUT /funcionarios/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .put('/api/funcionarios/' + 'id')
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token');
      const employee = await prisma.employee.findFirst();
      await request(app)
        .put('/api/funcionarios/' + employee?.id)
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('DELETE /funcionarios/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .delete('/api/funcionarios/' + 'id')
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .set('authorization', 'Bearer token');
      const employee = await prisma.employee.findFirst();
      await request(app)
        .delete('/api/funcionarios/' + employee?.id)
        .send()
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });
});
