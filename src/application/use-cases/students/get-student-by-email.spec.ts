import { describe, expect, it, vi } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbGetStudentByEmail } from './get-student-by-email';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbGetStudentByEmail(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeStudents = async (studentRepository: InMemoryStudentRepository) => {
  studentRepository.create(
    {
      matricula: 123,
      nome: 'nome',
      status: 'ATIVO',
      serie: 'serie',
      email: 'email@example.com',
      nascimento: new Date('2000-01-01'),
      sexo: 'MASCULINO',
      endereco: 'endereco',
      emailResponsavel: 'emailResponsavel@example.com',
      CPF: null,
      RG: null,
      nomeMae: null,
      nomePai: null,
      telefoneMae: null,
      telefonePai: null,
    },
    'id1'
  );
};

describe('Get student by email use case', () => {
  it('should get null if no student were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('email@example.com');
    expect(result).toEqual(null);
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const getSpy = vi.spyOn(studentRepository, 'getByEmail');
    await sut.execute('email@example.com');
    expect(getSpy).toHaveBeenCalledWith('email@example.com');
  });

  it('should get a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    const result = await sut.execute('email@example.com');
    expect(result).toEqual(
      expect.objectContaining({
        props: {
          matricula: 123,
          nome: 'nome',
          status: 'ATIVO',
          serie: 'serie',
          email: 'email@example.com',
          nascimento: new Date('2000-01-01'),
          sexo: 'MASCULINO',
          endereco: 'endereco',
          emailResponsavel: 'emailResponsavel@example.com',
          CPF: null,
          RG: null,
          nomeMae: null,
          nomePai: null,
          telefoneMae: null,
          telefonePai: null,
        },
      })
    );
  });
});
