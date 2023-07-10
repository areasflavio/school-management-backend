import {
  CreateStudentData,
  StudentRepository,
  UpdateStudentData,
} from '@application/repositories/student';
import { Student } from '@domain/entities/student';
import { prismaAdapterStudent } from '@main/adapter/prisma-entity';
import prisma from '@main/config/prisma';

export class PrismaStudentRepository implements StudentRepository {
  async create(data: CreateStudentData): Promise<void> {
    const {
      email,
      nome,
      CPF,
      RG,
      emailResponsavel,
      endereco,
      matricula,
      nascimento,
      nomeMae,
      nomePai,
      serie,
      sexo,
      status,
      telefoneMae,
      telefonePai,
      avatar,
    } = data;
    await prisma.student.create({
      data: {
        email,
        nome,
        emailResponsavel,
        endereco,
        nascimento,
        serie,
        sexo,
        status,
        CPF,
        matricula,
        nomeMae,
        nomePai,
        RG,
        telefoneMae,
        telefonePai,
        avatar,
      },
    });
  }

  async get(): Promise<Student[]> {
    const prismaStudents = await prisma.student.findMany();
    const students = prismaStudents.map(prismaAdapterStudent);
    return students;
  }

  async getById(id: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { id },
    });
    if (!prismaStudent) {
      return null;
    }
    const student = prismaAdapterStudent(prismaStudent);
    return student;
  }

  async getByEmail(email: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findFirst({
      where: { email },
    });
    if (!prismaStudent) {
      return null;
    }
    const student = prismaAdapterStudent(prismaStudent);
    return student;
  }

  async update(id: string, data: UpdateStudentData): Promise<void> {
    const {
      email,
      nome,
      CPF,
      RG,
      emailResponsavel,
      endereco,
      matricula,
      nascimento,
      nomeMae,
      nomePai,
      serie,
      sexo,
      status,
      telefoneMae,
      telefonePai,
      avatar,
    } = data;
    await prisma.student.update({
      where: { id },
      data: {
        email,
        nome,
        CPF,
        emailResponsavel,
        endereco,
        matricula,
        nascimento,
        nomeMae,
        nomePai,
        RG,
        serie,
        sexo,
        status,
        telefoneMae,
        telefonePai,
        avatar,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.student.delete({
      where: { id },
    });
  }
}
