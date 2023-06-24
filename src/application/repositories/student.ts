import { IStudent, Student } from '@domain/entities/student';

export type CreateStudentData = IStudent;

export type UpdateStudentData = Partial<IStudent>;

export interface StudentRepository {
  create(data: CreateStudentData): Promise<void>;
  get(): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  getByEmail(email: string): Promise<Student | null>;
  update(id: string, data: UpdateStudentData): Promise<void>;
  delete(id: string): Promise<void>;
}
