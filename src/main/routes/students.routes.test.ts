import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';

import app from '@main/config/app';
import prisma from '@main/config/prisma';

const makeStudentRouteBody = (ignoredAttr?: string) => {
  const fakeStudent: any = {
    matricula: 123,
    nome: 'nome',
    status: 'ATIVO',
    serie: 'serie',
    email: 'email@example.com',
    nascimento: new Date('2000-01-01'),
    sexo: 'MASCULINO',
    endereco: 'endereco',
    emailResponsavel: 'emailResponsavel@example.com',
    CPF: null,
    RG: null,
    nomeMae: null,
    nomePai: null,
    telefoneMae: null,
    telefonePai: null,
  };

  const filteredKeys = Object.keys(fakeStudent).filter(
    (key) => !ignoredAttr || key !== ignoredAttr
  );

  return Object.assign(
    {},
    filteredKeys.reduce((acc: any, key) => {
      acc[key] = fakeStudent[key];
      return acc;
    }, {})
  );
};

describe('Students Routes', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    await prisma.student.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /alunos', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody('email'))
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 400 on failure for existing email', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token');
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token')
        .expect(201);
    });
  });

  describe('GET /alunos', () => {
    test('should return 200 on success', async () => {
      await request(app)
        .get('/api/alunos')
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('GET /alunos/:id', () => {
    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token');
      const student = await prisma.student.findFirst();
      await request(app)
        .put('/api/alunos/' + student?.id)
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('PUT /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .put('/api/alunos/' + 'id')
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token');
      const student = await prisma.student.findFirst();
      await request(app)
        .put('/api/alunos/' + student?.id)
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });

  describe('DELETE /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .delete('/api/alunos/' + 'id')
        .set('authorization', 'Bearer token')
        .expect(400);
    });

    test('should return 200 on success', async () => {
      await request(app)
        .post('/api/alunos')
        .send(makeStudentRouteBody())
        .set('authorization', 'Bearer token');
      const student = await prisma.student.findFirst();
      await request(app)
        .delete('/api/alunos/' + student?.id)
        .send()
        .set('authorization', 'Bearer token')
        .expect(200);
    });
  });
});
