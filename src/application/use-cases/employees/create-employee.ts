import {
  CreateEmployeeData,
  EmployeeRepository,
} from '@application/repositories/employee';
import { CreateEmployee } from '@domain/use-cases/employee';

export class DbCreateEmployee implements CreateEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    email,
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
    avatar,
  }: CreateEmployeeData): Promise<void> {
    const isEmailAlreadyRegistered = await this.employeeRepository.getByEmail(
      email
    );
    if (isEmailAlreadyRegistered) {
      throw new Error('This email is already registered.');
    }
    await this.employeeRepository.create({
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
      avatar,
    });
  }
}
