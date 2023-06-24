import {
  CreateEmployeeData,
  EmployeeRepository,
  UpdateEmployeeData,
} from '@application/repositories/employee';
import { Employee } from '@domain/entities/employee';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  public employees: Employee[] = [];

  async create(employee: CreateEmployeeData, id?: string): Promise<void> {
    this.employees.push(
      Employee.create(
        {
          ...employee,
        },
        id
      )
    );
  }

  async get(): Promise<Employee[]> {
    return this.employees;
  }

  async getById(id: string): Promise<Employee | null> {
    return this.employees.find((employee) => employee.id === id) ?? null;
  }

  async getByEmail(email: string): Promise<Employee | null> {
    return (
      this.employees.find((employee) => employee.props.email === email) ?? null
    );
  }

  async update(id: string, data: UpdateEmployeeData): Promise<void> {
    this.employees.forEach((employee) => {
      if (employee.id === id) {
        employee.props = {
          ...employee.props,
          ...data,
        };
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }
}
