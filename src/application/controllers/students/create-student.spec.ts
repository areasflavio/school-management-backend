import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import {
  CreateStudentData,
  StudentRepository,
} from '@application/repositories/student';
import { CreateStudent } from '@domain/use-cases/student';
import { CreateStudentController } from './create-student';

const makeCreateStudent = (
  studentRepository: StudentRepository
): CreateStudent => {
  class CreateStudentStub implements CreateStudent {
    constructor(private studentRepository: StudentRepository) {}
    async execute(data: CreateStudentData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new CreateStudentStub(studentRepository);
};

interface SutTypes {
  sut: CreateStudentController;
  createStudent: CreateStudent;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const createStudent = makeCreateStudent(studentRepository);
  const sut = new CreateStudentController(createStudent);
  return {
    sut,
    createStudent,
  };
};

const makeHttpStudentBody = (ignoredAttr?: keyof CreateStudentData) => {
  const fakeStudent: CreateStudentData = {
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
      acc[key] = fakeStudent[key as keyof CreateStudentData];
      return acc;
    }, {} as CreateStudentData)
  );
};

describe('Create Student Controller', () => {
  test('should return 400 if no matricula is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('matricula'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('matricula'));
  });

  test('should return 400 if no nome is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('nome'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nome'));
  });

  test('should return 400 if no status is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('status'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('status'));
  });

  test('should return 400 if no serie is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('serie'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('serie'));
  });

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('email'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no nascimento is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('nascimento'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nascimento'));
  });

  test('should return 400 if no sexo is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('sexo'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('sexo'));
  });

  test('should return 400 if no endereco is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('endereco'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('endereco'));
  });

  test('should return 400 if no emailResponsavel is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody('emailResponsavel'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('emailResponsavel')
    );
  });

  test('should call CreateStudent with correct values', async () => {
    const { sut, createStudent } = makeSut();
    const createStudentSpy = vi.spyOn(createStudent, 'execute');
    const httpRequest = {
      body: makeHttpStudentBody(),
    };
    await sut.handle(httpRequest);
    expect(createStudentSpy).toHaveBeenCalledWith(makeHttpStudentBody());
  });

  test('should return 400 if CreateStudent throws an Error instance', async () => {
    const { sut, createStudent } = makeSut();
    vi.spyOn(createStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      body: makeHttpStudentBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if CreateStudent throws', async () => {
    const { sut, createStudent } = makeSut();
    vi.spyOn(createStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      body: makeHttpStudentBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpStudentBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
