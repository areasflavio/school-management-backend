import { describe, expect, it } from 'vitest';

import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DbGetEmployees } from './get-employees';

const makeSut = () => {
  const inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
  const sut = new DbGetEmployees(inMemoryEmployeeRepository);
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

describe('Get employees use case', () => {
  it('should get an empty array of employees if no employee were created', async () => {
    const { sut } = makeSut();
    const results = await sut.execute();
    expect(results.length).toEqual(0);
    expect(results).toEqual(expect.arrayContaining([]));
  });

  it('should get an array of employees on success', async () => {
    const { employeeRepository, sut } = makeSut();
    await makeEmployees(employeeRepository);
    const results = await sut.execute();
    expect(results.length).toEqual(3);
    expect(results).toEqual(
      expect.arrayContaining([
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
        }),
      ])
    );
  });
});
