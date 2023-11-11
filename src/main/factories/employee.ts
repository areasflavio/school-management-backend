import { CreateEmployeeController } from '@application/controllers/employees/create-employee';
import { DeleteEmployeeController } from '@application/controllers/employees/delete-employee';
import { GetEmployeeByEmailController } from '@application/controllers/employees/get-employee-by-email';
import { GetEmployeeByIdController } from '@application/controllers/employees/get-employee-by-id';
import { GetEmployeesController } from '@application/controllers/employees/get-employees';
import { UpdateEmployeeController } from '@application/controllers/employees/update-employee';
import { PrismaEmployeeRepository } from '@application/repositories/prisma/employee';
import { DbCreateEmployee } from '@application/use-cases/employees/create-employee';
import { DbDeleteEmployee } from '@application/use-cases/employees/delete-employee';
import { DbGetEmployeeByEmail } from '@application/use-cases/employees/get-employee-by-email';
import { DbGetEmployeeById } from '@application/use-cases/employees/get-employee-by-id';
import { DbGetEmployees } from '@application/use-cases/employees/get-employees';
import { DbUpdateEmployee } from '@application/use-cases/employees/update-employee';

export const makeCreateEmployeeController = (): CreateEmployeeController => {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const createEmployee = new DbCreateEmployee(prismaEmployeeRepository);
  return new CreateEmployeeController(createEmployee);
};

export const makeGetEmployeesController = (): GetEmployeesController => {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const getEmployees = new DbGetEmployees(prismaEmployeeRepository);
  return new GetEmployeesController(getEmployees);
};

export const makeGetEmployeeByIdController = (): GetEmployeeByIdController => {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const getEmployeeById = new DbGetEmployeeById(prismaEmployeeRepository);
  return new GetEmployeeByIdController(getEmployeeById);
};

export const makeGetEmployeeByEmailController =
  (): GetEmployeeByEmailController => {
    const prismaEmployeeRepository = new PrismaEmployeeRepository();
    const getEmployeeByEmail = new DbGetEmployeeByEmail(
      prismaEmployeeRepository
    );
    return new GetEmployeeByEmailController(getEmployeeByEmail);
  };

export const makeUpdateEmployeeController = (): UpdateEmployeeController => {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const updateEmployee = new DbUpdateEmployee(prismaEmployeeRepository);
  return new UpdateEmployeeController(updateEmployee);
};

export const makeDeleteEmployeeController = (): DeleteEmployeeController => {
  const prismaEmployeeRepository = new PrismaEmployeeRepository();
  const deleteEmployee = new DbDeleteEmployee(prismaEmployeeRepository);
  return new DeleteEmployeeController(deleteEmployee);
};
