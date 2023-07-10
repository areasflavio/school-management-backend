import { describe, expect, it, vi } from 'vitest';

import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DbDeleteEmployee } from './delete-employee';

const makeSut = () => {
  const inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
  const sut = new DbDeleteEmployee(inMemoryEmployeeRepository);
  return {
    sut,
    employeeRepository: inMemoryEmployeeRepository,
  };
};

const makeEmployees = async (
  employeeRepository: InMemoryEmployeeRepository
) => {
  await employeeRepository.create(
    {
      nome: 'employee1',
      status: 'ATIVO',
      email: 'employee1@example.com',
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
    },
    'id1'
  );
  await employeeRepository.create(
    {
      nome: 'employee2',
      status: 'ATIVO',
      email: 'employee2@example.com',
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
    },
    'id2'
  );
  await employeeRepository.create(
    {
      nome: 'employee3',
      status: 'ATIVO',
      email: 'employee3@example.com',
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
    },
    'id3'
  );
};

describe('Delete employee use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id');
    expect(promise).rejects.toThrow();
  });

  it('should call EmployeeRepository with correct values', async () => {
    const { sut, employeeRepository } = makeSut();
    await makeEmployees(employeeRepository);
    const deleteSpy = vi.spyOn(employeeRepository, 'delete');
    await sut.execute('id1');
    expect(deleteSpy).toHaveBeenCalledWith('id1');
  });

  it('should delete a employee on success', async () => {
    const { employeeRepository, sut } = makeSut();
    await makeEmployees(employeeRepository);
    await sut.execute('id1');
    expect(employeeRepository.employees).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            nome: 'employee1',
            email: 'employee1@example.com',
          },
        }),
      ])
    );
  });
});
