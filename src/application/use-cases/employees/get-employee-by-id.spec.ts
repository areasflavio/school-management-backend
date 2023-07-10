import { describe, expect, it, vi } from 'vitest';

import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DbGetEmployeeById } from './get-employee-by-id';

const makeSut = () => {
  const inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
  const sut = new DbGetEmployeeById(inMemoryEmployeeRepository);
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

describe('Get employee by id use case', () => {
  it('should get null if no employee were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('id');
    expect(result).toEqual(null);
  });

  it('should call EmployeeRepository with correct values', async () => {
    const { sut, employeeRepository } = makeSut();
    await makeEmployees(employeeRepository);
    const getSpy = vi.spyOn(employeeRepository, 'getById');
    await sut.execute('id1');
    expect(getSpy).toHaveBeenCalledWith('id1');
  });

  it('should get a employee on success', async () => {
    const { employeeRepository, sut } = makeSut();
    await makeEmployees(employeeRepository);
    const result = await sut.execute('id1');
    expect(result).toEqual(
      expect.objectContaining({
        props: {
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
      })
    );
  });
});
