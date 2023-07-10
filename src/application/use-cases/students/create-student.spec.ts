import { describe, expect, it, vi } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { CreateStudentData } from '@application/repositories/student';
import { DbCreateStudent } from './create-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbCreateStudent(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeHttpStudentBody = (): CreateStudentData => {
  return {
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
    avatar: null,
  };
};

describe('Create student use case', () => {
  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    const createSpy = vi.spyOn(studentRepository, 'create');
    await sut.execute(makeHttpStudentBody());
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining(makeHttpStudentBody())
    );
  });

  it('should throw if a provided email is already registered', async () => {
    const { sut } = makeSut();
    await sut.execute(makeHttpStudentBody());
    const promise = sut.execute(makeHttpStudentBody());
    expect(promise).rejects.toThrow();
  });

  it('should create a new student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await sut.execute(makeHttpStudentBody());
    expect(studentRepository.students.length).toBe(1);
    expect(studentRepository.students[0].id).toBeTruthy();
    expect(studentRepository.students[0]).toEqual(
      expect.objectContaining({
        props: makeHttpStudentBody(),
      })
    );
  });
});
