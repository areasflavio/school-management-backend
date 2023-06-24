import { StudentRepository } from '@application/repositories/student';
import { Student } from '@domain/entities/student';
import { GetStudentByEmail } from '@domain/use-cases/student';

export class DbGetStudentByEmail implements GetStudentByEmail {
  constructor(private studentRepository: StudentRepository) {}

  async execute(email: string): Promise<Student | null> {
    const student = await this.studentRepository.getByEmail(email);
    return student;
  }
}
