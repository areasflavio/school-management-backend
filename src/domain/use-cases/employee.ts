import { Employee, IEmployee } from '@domain/entities/employee';

export interface CreateEmployee {
  execute: (account: IEmployee) => Promise<void>;
}

export interface GetEmployees {
  execute: () => Promise<Employee[]>;
}

export interface GetEmployeeById {
  execute: (id: string) => Promise<Employee | null>;
}

export interface GetEmployeeByEmail {
  execute: (email: string) => Promise<Employee | null>;
}

export interface UpdateEmployee {
  execute: (id: string, data: Partial<IEmployee>) => Promise<void>;
}

export interface DeleteEmployee {
  execute: (id: string) => Promise<void>;
}
