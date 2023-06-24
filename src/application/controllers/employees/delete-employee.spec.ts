import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { EmployeeRepository } from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DeleteEmployee } from '@domain/use-cases/employee';
import { DeleteEmployeeController } from './delete-employee';

const makeDeleteEmployee = (
  employeeRepository: EmployeeRepository
): DeleteEmployee => {
  class DeleteEmployeeStub implements DeleteEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(id: string): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new DeleteEmployeeStub(employeeRepository);
};

interface SutTypes {
  sut: DeleteEmployeeController;
  deleteEmployee: DeleteEmployee;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const deleteEmployee = makeDeleteEmployee(employeeRepository);
  const sut = new DeleteEmployeeController(deleteEmployee);
  return {
    sut,
    deleteEmployee,
  };
};

describe('Update Employee Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call DeleteEmployee with correct values', async () => {
    const { sut, deleteEmployee } = makeSut();
    const deleteEmployeeSpy = vi.spyOn(deleteEmployee, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(deleteEmployeeSpy).toHaveBeenCalledWith('id');
  });

  test('should return 400 if DeleteEmployee throws an Error instance', async () => {
    const { sut, deleteEmployee } = makeSut();
    vi.spyOn(deleteEmployee, 'execute').mockImplementationOnce(async () => {
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

  test('should return 500 if DeleteEmployee throws', async () => {
    const { sut, deleteEmployee } = makeSut();
    vi.spyOn(deleteEmployee, 'execute').mockImplementationOnce(async () => {
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
