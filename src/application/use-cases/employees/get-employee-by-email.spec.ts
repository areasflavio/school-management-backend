import { describe, expect, it, vi } from 'vitest';

import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { DbGetEmployeeByEmail } from './get-employee-by-email';

const makeSut = () => {
  const inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
  const sut = new DbGetEmployeeByEmail(inMemoryEmployeeRepository);
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
};

describe('Get employee by email use case', () => {
  it('should get null if no employee were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('employee1@example.com');
    expect(result).toEqual(null);
  });

  it('should call EmployeeRepository with correct values', async () => {
    const { sut, employeeRepository } = makeSut();
    await makeEmployees(employeeRepository);
    const getSpy = vi.spyOn(employeeRepository, 'getByEmail');
    await sut.execute('employee1@example.com');
    expect(getSpy).toHaveBeenCalledWith('employee1@example.com');
  });

  it('should get a employee on success', async () => {
    const { employeeRepository, sut } = makeSut();
    await makeEmployees(employeeRepository);
    const result = await sut.execute('employee1@example.com');
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
