import { Account } from '@domain/entities/account';
import { Employee } from '@domain/entities/employee';
import { Student } from '@domain/entities/student';
import {
  Account as PrismaAccount,
  Employee as PrismaEmployee,
  Student as PrismaStudent,
} from '@prisma/client';

export const prismaAdapterStudent = (prismaStudent: PrismaStudent): Student => {
  const {
    email,
    id,
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
  } = prismaStudent;
  const student = Student.create(
    {
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
    },
    id
  );
  return student;
};

export const prismaAdapterEmployee = (
  prismaEmployee: PrismaEmployee
): Employee => {
  const {
    email,
    id,
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
  } = prismaEmployee;
  const employee = Employee.create(
    {
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
    id
  );
  return employee;
};

export const prismaAdapterAccount = (prismaAccount: PrismaAccount): Account => {
  const { email, id, password, role } = prismaAccount;
  const account = Account.create(
    {
      email,
      password,
      role,
    },
    id
  );
  return account;
};
