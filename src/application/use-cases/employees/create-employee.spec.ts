import { describe, expect, it, vi } from 'vitest';

import { CreateEmployeeData } from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DbCreateEmployee } from './create-employee';

const makeSut = () => {
  const inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
  const sut = new DbCreateEmployee(inMemoryEmployeeRepository);
  return {
    sut,
    employeeRepository: inMemoryEmployeeRepository,
  };
};

const makeHttpEmployeeBody = (): CreateEmployeeData => {
  return {
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
};

describe('Create employee use case', () => {
  it('should call EmployeeRepository with correct values', async () => {
    const { sut, employeeRepository } = makeSut();
    const createSpy = vi.spyOn(employeeRepository, 'create');
    await sut.execute(makeHttpEmployeeBody());
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining(makeHttpEmployeeBody())
    );
  });

  it('should throw if a provided email is already registered', async () => {
    const { sut } = makeSut();
    await sut.execute(makeHttpEmployeeBody());
    const promise = sut.execute(makeHttpEmployeeBody());
    expect(promise).rejects.toThrow();
  });

  it('should create a new employee on success', async () => {
    const { employeeRepository, sut } = makeSut();
    await sut.execute(makeHttpEmployeeBody());
    expect(employeeRepository.employees.length).toBe(1);
    expect(employeeRepository.employees[0].id).toBeTruthy();
    expect(employeeRepository.employees[0]).toEqual(
      expect.objectContaining({
        props: makeHttpEmployeeBody(),
      })
    );
  });
});
