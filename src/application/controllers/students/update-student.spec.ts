import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import {
  StudentRepository,
  UpdateStudentData,
} from '@application/repositories/student';
import { UpdateStudent } from '@domain/use-cases/student';
import { UpdateStudentController } from './update-student';

const makeUpdateStudent = (
  studentRepository: StudentRepository
): UpdateStudent => {
  class UpdateStudentStub implements UpdateStudent {
    constructor(private studentRepository: StudentRepository) {}
    async execute(id: string, data: UpdateStudentData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new UpdateStudentStub(studentRepository);
};

interface SutTypes {
  sut: UpdateStudentController;
  updateStudent: UpdateStudent;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const updateStudent = makeUpdateStudent(studentRepository);
  const sut = new UpdateStudentController(updateStudent);
  return {
    sut,
    updateStudent,
  };
};

describe('Update Student Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call UpdateStudent with correct values', async () => {
    const { sut, updateStudent } = makeSut();
    const updateStudentSpy = vi.spyOn(updateStudent, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    await sut.handle(httpRequest);
    expect(updateStudentSpy).toHaveBeenCalledWith('id', {
      nome: 'nome',
      email: 'email@example.com',
    });
  });

  test('should return 400 if UpdateStudent throws an Error instance', async () => {
    const { sut, updateStudent } = makeSut();
    vi.spyOn(updateStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if UpdateStudent throws', async () => {
    const { sut, updateStudent } = makeSut();
    vi.spyOn(updateStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
