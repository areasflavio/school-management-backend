import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import {
  CreateEmployeeData,
  EmployeeRepository,
} from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { CreateEmployee } from '@domain/use-cases/employee';
import { CreateEmployeeController } from './create-employee';

const makeCreateEmployee = (
  employeeRepository: EmployeeRepository
): CreateEmployee => {
  class CreateEmployeeStub implements CreateEmployee {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(data: CreateEmployeeData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new CreateEmployeeStub(employeeRepository);
};

interface SutTypes {
  sut: CreateEmployeeController;
  createEmployee: CreateEmployee;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const createEmployee = makeCreateEmployee(employeeRepository);
  const sut = new CreateEmployeeController(createEmployee);
  return {
    sut,
    createEmployee,
  };
};

const makeHttpEmployeeBody = (ignoredAttr?: keyof CreateEmployeeData) => {
  const fakeEmployee: CreateEmployeeData = {
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
    avatar: null,
  };

  const filteredKeys = Object.keys(fakeEmployee).filter(
    (key) => !ignoredAttr || key !== ignoredAttr
  );

  return Object.assign(
    {},
    filteredKeys.reduce((acc: any, key) => {
      acc[key] = fakeEmployee[key as keyof CreateEmployeeData];
      return acc;
    }, {} as CreateEmployeeData)
  );
};

describe('Create Employee Controller', () => {
  test('should return 400 if no registro is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('registro'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('registro'));
  });

  test('should return 400 if no nome is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('nome'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nome'));
  });

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('email'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no status is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('status'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('status'));
  });

  test('should return 400 if no vinculo is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('vinculo'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('vinculo'));
  });

  test('should return 400 if no admissao is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('admissao'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('admissao'));
  });

  test('should return 400 if no cargo is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('cargo'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cargo'));
  });

  test('should return 400 if no RG is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('RG'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('RG'));
  });

  test('should return 400 if no CPF is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('CPF'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('CPF'));
  });

  test('should return 400 if no nascimento is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('nascimento'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nascimento'));
  });

  test('should return 400 if no sexo is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('sexo'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('sexo'));
  });

  test('should return 400 if no escolaridade is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('escolaridade'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('escolaridade'));
  });

  test('should return 400 if no endereco is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody('endereco'),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('endereco'));
  });

  test('should call CreateEmployee with correct values', async () => {
    const { sut, createEmployee } = makeSut();
    const createEmployeeSpy = vi.spyOn(createEmployee, 'execute');
    const httpRequest = {
      body: makeHttpEmployeeBody(),
    };
    await sut.handle(httpRequest);
    expect(createEmployeeSpy).toHaveBeenCalledWith(makeHttpEmployeeBody());
  });

  test('should return 400 if CreateEmployee throws an Error instance', async () => {
    const { sut, createEmployee } = makeSut();
    vi.spyOn(createEmployee, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      body: makeHttpEmployeeBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if CreateEmployee throws', async () => {
    const { sut, createEmployee } = makeSut();
    vi.spyOn(createEmployee, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      body: makeHttpEmployeeBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: makeHttpEmployeeBody(),
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
