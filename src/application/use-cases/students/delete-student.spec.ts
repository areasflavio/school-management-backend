import { describe, expect, it, vi } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbDeleteStudent } from './delete-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbDeleteStudent(inMemoryStudentRepository);
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

describe('Delete student use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id');
    expect(promise).rejects.toThrow();
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const deleteSpy = vi.spyOn(studentRepository, 'delete');
    await sut.execute('id1');
    expect(deleteSpy).toHaveBeenCalledWith('id1');
  });

  it('should delete a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    await sut.execute('id1');
    expect(studentRepository.students).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            nome: 'student1',
            email: 'student1@example.com',
          },
        }),
      ])
    );
  });
});
