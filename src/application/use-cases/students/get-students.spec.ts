import { describe, expect, it } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbGetStudents } from './get-students';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbGetStudents(inMemoryStudentRepository);
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

describe('Get students use case', () => {
  it('should get an empty array of students if no student were created', async () => {
    const { sut } = makeSut();
    const results = await sut.execute();
    expect(results.length).toEqual(0);
    expect(results).toEqual(expect.arrayContaining([]));
  });

  it('should get an array of students on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    const results = await sut.execute();
    expect(results.length).toEqual(3);
    expect(results).toEqual(
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
            avatar: null,
          },
        }),
      ])
    );
  });
});
