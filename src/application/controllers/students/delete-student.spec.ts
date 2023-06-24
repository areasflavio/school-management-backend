import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { StudentRepository } from '@application/repositories/student';
import { DeleteStudent } from '@domain/use-cases/student';
import { DeleteStudentController } from './delete-student';

const makeDeleteStudent = (
  studentRepository: StudentRepository
): DeleteStudent => {
  class DeleteStudentStub implements DeleteStudent {
    constructor(private studentRepository: StudentRepository) {}
    async execute(id: string): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new DeleteStudentStub(studentRepository);
};

interface SutTypes {
  sut: DeleteStudentController;
  deleteStudent: DeleteStudent;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const deleteStudent = makeDeleteStudent(studentRepository);
  const sut = new DeleteStudentController(deleteStudent);
  return {
    sut,
    deleteStudent,
  };
};

describe('Update Student Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call DeleteStudent with correct values', async () => {
    const { sut, deleteStudent } = makeSut();
    const deleteStudentSpy = vi.spyOn(deleteStudent, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(deleteStudentSpy).toHaveBeenCalledWith('id');
  });

  test('should return 400 if DeleteStudent throws an instance', async () => {
    const { sut, deleteStudent } = makeSut();
    vi.spyOn(deleteStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if DeleteStudent throws', async () => {
    const { sut, deleteStudent } = makeSut();
    vi.spyOn(deleteStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      params: {
        id: 'id',
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
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
