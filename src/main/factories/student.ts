import { CreateStudentController } from '@application/controllers/students/create-student';
import { DeleteStudentController } from '@application/controllers/students/delete-student';
import { GetStudentByEmailController } from '@application/controllers/students/get-student-by-email';
import { GetStudentByIdController } from '@application/controllers/students/get-student-by-id';
import { GetStudentsController } from '@application/controllers/students/get-students';
import { UpdateStudentController } from '@application/controllers/students/update-student';
import { PrismaStudentRepository } from '@application/repositories/prisma/student';
import { DbCreateStudent } from '@application/use-cases/students/create-student';
import { DbDeleteStudent } from '@application/use-cases/students/delete-student';
import { DbGetStudentByEmail } from '@application/use-cases/students/get-student-by-email';
import { DbGetStudentById } from '@application/use-cases/students/get-student-by-id';
import { DbGetStudents } from '@application/use-cases/students/get-students';
import { DbUpdateStudent } from '@application/use-cases/students/update-student';

export const makeCreateStudentController = (): CreateStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const createStudent = new DbCreateStudent(prismaStudentRepository);
  return new CreateStudentController(createStudent);
};

export const makeGetStudentsController = (): GetStudentsController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const getStudents = new DbGetStudents(prismaStudentRepository);
  return new GetStudentsController(getStudents);
};

export const makeGetStudentByIdController = (): GetStudentByIdController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const getStudentById = new DbGetStudentById(prismaStudentRepository);
  return new GetStudentByIdController(getStudentById);
};

export const makeGetStudentByEmailController =
  (): GetStudentByEmailController => {
    const prismaStudentRepository = new PrismaStudentRepository();
    const getStudentByEmail = new DbGetStudentByEmail(prismaStudentRepository);
    return new GetStudentByEmailController(getStudentByEmail);
  };

export const makeUpdateStudentController = (): UpdateStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const updateStudent = new DbUpdateStudent(prismaStudentRepository);
  return new UpdateStudentController(updateStudent);
};

export const makeDeleteStudentController = (): DeleteStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const deleteStudent = new DbDeleteStudent(prismaStudentRepository);
  return new DeleteStudentController(deleteStudent);
};
