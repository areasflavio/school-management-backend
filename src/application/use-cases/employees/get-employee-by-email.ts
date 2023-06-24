import { EmployeeRepository } from '@application/repositories/employee';
import { Employee } from '@domain/entities/employee';
import { GetEmployeeByEmail } from '@domain/use-cases/employee';

export class DbGetEmployeeByEmail implements GetEmployeeByEmail {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(email: string): Promise<Employee | null> {
    const employee = await this.employeeRepository.getByEmail(email);
    return employee;
  }
}
