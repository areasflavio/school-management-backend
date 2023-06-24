import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import {
  EmployeeRepository,
  UpdateEmployeeData,
} from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { UpdateEmployee } from '@domain/use-cases/employee';
import { UpdateEmployeeController } from './update-employee';

const makeUpdateEmployee = (
  employeeRepository: EmployeeRepository
): UpdateEmployee => {
  class UpdateEmployeeStub implements UpdateEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(id: string, data: UpdateEmployeeData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new UpdateEmployeeStub(employeeRepository);
};

interface SutTypes {
  sut: UpdateEmployeeController;
  updateEmployee: UpdateEmployee;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const updateEmployee = makeUpdateEmployee(employeeRepository);
  const sut = new UpdateEmployeeController(updateEmployee);
  return {
    sut,
    updateEmployee,
  };
};

describe('Update Employee Controller', () => {
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

  test('should call UpdateEmployee with correct values', async () => {
    const { sut, updateEmployee } = makeSut();
    const updateEmployeeSpy = vi.spyOn(updateEmployee, 'execute');
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
    expect(updateEmployeeSpy).toHaveBeenCalledWith('id', {
      nome: 'nome',
      email: 'email@example.com',
    });
  });

  test('should return 400 if UpdateEmployee throws an Error instance', async () => {
    const { sut, updateEmployee } = makeSut();
    vi.spyOn(updateEmployee, 'execute').mockImplementationOnce(async () => {
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

  test('should return 500 if UpdateEmployee throws', async () => {
    const { sut, updateEmployee } = makeSut();
    vi.spyOn(updateEmployee, 'execute').mockImplementationOnce(async () => {
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
