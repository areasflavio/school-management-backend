import {
  CreateEmployeeData,
  EmployeeRepository,
  UpdateEmployeeData,
} from '@application/repositories/employee';
import { Employee } from '@domain/entities/employee';
import { prismaAdapterEmployee } from '@main/adapter/prisma-entity';
import prisma from '@main/config/prisma';

export class PrismaEmployeeRepository implements EmployeeRepository {
  async create(data: CreateEmployeeData): Promise<void> {
    const {
      email,
      nome,
      CPF,
      RG,
      admissao,
      cargo,
      endereco,
      escolaridade,
      nascimento,
      registro,
      sexo,
      status,
      vinculo,
    } = data;
    await prisma.employee.create({
      data: {
        email,
        nome,
        admissao,
        cargo,
        CPF,
        endereco,
        escolaridade,
        nascimento,
        RG,
        sexo,
        status,
        vinculo,
        registro,
      },
    });
  }

  async get(): Promise<Employee[]> {
    const prismaEmployees = await prisma.employee.findMany();
    const employees = prismaEmployees.map(prismaAdapterEmployee);
    return employees;
  }

  async getById(id: string): Promise<Employee | null> {
    const prismaEmployee = await prisma.employee.findUnique({
      where: { id },
    });
    if (!prismaEmployee) {
      return null;
    }
    const employee = prismaAdapterEmployee(prismaEmployee);
    return employee;
  }

  async getByEmail(email: string): Promise<Employee | null> {
    const prismaEmployee = await prisma.employee.findFirst({
      where: { email },
    });
    if (!prismaEmployee) {
      return null;
    }
    const employee = prismaAdapterEmployee(prismaEmployee);
    return employee;
  }

  async update(id: string, data: UpdateEmployeeData): Promise<void> {
    const {
      email,
      nome,
      CPF,
      RG,
      admissao,
      cargo,
      endereco,
      escolaridade,
      nascimento,
      registro,
      sexo,
      status,
      vinculo,
    } = data;
    await prisma.employee.update({
      where: { id },
      data: {
        email,
        nome,
        CPF,
        admissao,
        cargo,
        endereco,
        escolaridade,
        nascimento,
        registro,
        RG,
        sexo,
        status,
        vinculo,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({
      where: { id },
    });
  }
}
