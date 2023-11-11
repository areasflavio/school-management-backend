import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { StudentRepository } from '@application/repositories/student';
import { Student } from '@domain/entities/student';
import { GetStudentByEmail } from '@domain/use-cases/student';
import { GetStudentByEmailController } from './get-student-by-email';

const makeGetStudentByEmail = (
  studentRepository: StudentRepository
): GetStudentByEmail => {
  class GetStudentByEmailStub implements GetStudentByEmail {
    constructor(private studentRepository: StudentRepository) {}
    async execute(email: string): Promise<Student | null> {
      return await Promise.resolve(null);
    }
  }
  return new GetStudentByEmailStub(studentRepository);
};

interface SutTypes {
  sut: GetStudentByEmailController;
  getStudentByEmail: GetStudentByEmail;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const getStudentByEmail = makeGetStudentByEmail(studentRepository);
  const sut = new GetStudentByEmailController(getStudentByEmail);
  return {
    sut,
    getStudentByEmail,
  };
};

describe('Get Student By Email Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should call GetStudentByEmail with correct values', async () => {
    const { sut, getStudentByEmail } = makeSut();
    const getStudentByEmailSpy = vi.spyOn(getStudentByEmail, 'execute');
    const httpRequest = {
      params: {
        email: 'email',
      },
    };
    await sut.handle(httpRequest);
    expect(getStudentByEmailSpy).toHaveBeenCalledWith('email');
  });

  test('should return 500 if GetStudentByEmail throws', async () => {
    const { sut, getStudentByEmail } = makeSut();
    vi.spyOn(getStudentByEmail, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpRequest = {
      params: {
        email: 'email',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return null if no Student were found', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        email: 'email',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toBe(null);
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        email: 'email',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
