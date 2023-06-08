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
      email: 'student1@example.com',
      nome: 'student1',
    },
    'id1'
  );
  studentRepository.create(
    {
      email: 'student2@example.com',
      nome: 'student2',
    },
    'id2'
  );
  studentRepository.create(
    {
      email: 'student3@example.com',
      nome: 'student3',
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
          nome: 'student1',
          email: 'student1@example.com',
        },
      })
    );
  });
});