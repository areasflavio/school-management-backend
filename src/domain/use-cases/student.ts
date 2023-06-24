import { IStudent, Student } from '@domain/entities/student';

export interface CreateStudent {
  execute: (account: IStudent) => Promise<void>;
}

export interface GetStudents {
  execute: () => Promise<Student[]>;
}

export interface GetStudentById {
  execute: (id: string) => Promise<Student | null>;
}

export interface GetStudentByEmail {
  execute: (email: string) => Promise<Student | null>;
}

export interface UpdateStudent {
  execute: (id: string, data: Partial<IStudent>) => Promise<void>;
}

export interface DeleteStudent {
  execute: (id: string) => Promise<void>;
}
