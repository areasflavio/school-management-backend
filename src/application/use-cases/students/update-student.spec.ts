import { describe, expect, it, vi } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbUpdateStudent } from './update-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbUpdateStudent(inMemoryStudentRepository);
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
    },
    'id3'
  );
};

describe('Update student use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id', {
      email: 'student@example.com',
      nome: 'student',
    });
    expect(promise).rejects.toThrow();
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const updateSpy = vi.spyOn(studentRepository, 'update');
    await sut.execute('id1', {
      nome: 'student',
      email: 'student@example.com',
    });
    expect(updateSpy).toHaveBeenCalledWith('id1', {
      nome: 'student',
      email: 'student@example.com',
    });
  });

  it('should update a student on success even if no data is provided', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    await sut.execute('id1', {});
    expect(studentRepository.students).toEqual(
      expect.arrayContaining([
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
          },
        }),
      ])
    );
  });

  it('should update a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    await sut.execute('id1', {
      email: 'student@example.com',
      nome: 'student',
    });
    expect(studentRepository.students).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            matricula: 123,
            nome: 'student',
            status: 'ATIVO',
            serie: 'serie',
            email: 'student@example.com',
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
        }),
      ])
    );
  });
});
