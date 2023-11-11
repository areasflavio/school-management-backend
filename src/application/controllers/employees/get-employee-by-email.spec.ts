import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { EmployeeRepository } from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { Employee } from '@domain/entities/employee';
import { GetEmployeeByEmail } from '@domain/use-cases/employee';
import { GetEmployeeByEmailController } from './get-employee-by-email';

const makeGetEmployeeByEmail = (
  employeeRepository: EmployeeRepository
): GetEmployeeByEmail => {
  class GetEmployeeByEmailStub implements GetEmployeeByEmail {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(email: string): Promise<Employee | null> {
      return await Promise.resolve(null);
    }
  }
  return new GetEmployeeByEmailStub(employeeRepository);
};

interface SutTypes {
  sut: GetEmployeeByEmailController;
  getEmployeeByEmail: GetEmployeeByEmail;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const getEmployeeByEmail = makeGetEmployeeByEmail(employeeRepository);
  const sut = new GetEmployeeByEmailController(getEmployeeByEmail);
  return {
    sut,
    getEmployeeByEmail,
  };
};

describe('Get Employee By Email Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should call GetEmployeeByEmail with correct values', async () => {
    const { sut, getEmployeeByEmail } = makeSut();
    const getEmployeeByEmailSpy = vi.spyOn(getEmployeeByEmail, 'execute');
    const httpRequest = {
      params: {
        email: 'email',
      },
    };
    await sut.handle(httpRequest);
    expect(getEmployeeByEmailSpy).toHaveBeenCalledWith('email');
  });

  test('should return 500 if GetEmployeeByEmail throws', async () => {
    const { sut, getEmployeeByEmail } = makeSut();
    vi.spyOn(getEmployeeByEmail, 'execute').mockImplementationOnce(async () => {
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

  test('should return null if no Employee were found', async () => {
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
