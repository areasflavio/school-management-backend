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
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody());
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody())
        .expect(201);
    });
  });

  describe('GET /funcionarios', () => {
    test('should return 200 on success', async () => {
      await request(app).get('/api/funcionarios').expect(200);
    });
  });

  describe('GET /funcionarios/:id', () => {
    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody());
      const employee = await prisma.employee.findFirst();
      await request(app)
        .put('/api/funcionarios/' + employee?.id)
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
        .expect(400 | 500);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody());
      const employee = await prisma.employee.findFirst();
      await request(app)
        .put('/api/funcionarios/' + employee?.id)
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .expect(200);
    });
  });

  describe('DELETE /funcionarios/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .delete('/api/funcionarios/' + 'id')
        .expect(400 | 500);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/funcionarios')
        .send(makeEmployeeRouteBody());
      const employee = await prisma.employee.findFirst();
      await request(app)
        .delete('/api/funcionarios/' + employee?.id)
        .expect(200);
    });
  });
});
