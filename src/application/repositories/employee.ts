import { Employee, IEmployee } from '@domain/entities/employee';

export type CreateEmployeeData = IEmployee;

export type UpdateEmployeeData = Partial<IEmployee>;

export interface EmployeeRepository {
  create(data: CreateEmployeeData): Promise<void>;
  get(): Promise<Employee[]>;
  getById(id: string): Promise<Employee | null>;
  getByEmail(email: string): Promise<Employee | null>;
  update(id: string, data: UpdateEmployeeData): Promise<void>;
  delete(id: string): Promise<void>;
}
