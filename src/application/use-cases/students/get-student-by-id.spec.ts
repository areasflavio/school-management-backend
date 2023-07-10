import { describe, expect, it, vi } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbGetStudentById } from './get-student-by-id';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbGetStudentById(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeStudents = async (studentRepository: InMemoryStudentRepository) => {
  studentRepository.create(
    {
      matricula: 123,
      nome: 'nome1',
      status: 'ATIVO',
      serie: 'serie',
      email: 'email1@example.com',
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
      avatar: null,
    },
    'id1'
  );
  studentRepository.create(
    {
      matricula: 123,
      nome: 'nome2',
      status: 'ATIVO',
      serie: 'serie',
      email: 'email2@example.com',
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
      avatar: null,
    },
    'id2'
  );
  studentRepository.create(
    {
      matricula: 123,
      nome: 'nome3',
      status: 'ATIVO',
      serie: 'serie',
      email: 'email3@example.com',
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
      avatar: null,
    },
    'id3'
  );
};

describe('Get student by id use case', () => {
  it('should get null if no student were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('id');
    expect(result).toEqual(null);
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const getSpy = vi.spyOn(studentRepository, 'getById');
    await sut.execute('id1');
    expect(getSpy).toHaveBeenCalledWith('id1');
  });

  it('should get a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    const result = await sut.execute('id1');
    expect(result).toEqual(
      expect.objectContaining({
        props: {
          matricula: 123,
          nome: 'nome1',
          status: 'ATIVO',
          serie: 'serie',
          email: 'email1@example.com',
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
          avatar: null,
        },
      })
    );
  });
});
