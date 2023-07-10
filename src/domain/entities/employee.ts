import { Entity } from '@core/domain/entity';

export interface IEmployee {
  registro: number;
  nome: string;
  email: string;
  status: 'ATIVO' | 'INATIVO';
  vinculo: 'CONTRATADO' | 'CONCURSADO' | 'SUBSTITUTO';
  admissao: Date;
  cargo: 'DIRECAO' | 'COORDENACAO' | 'SECRETARIA' | 'PROFESSOR';
  RG: string;
  CPF: string;
  nascimento: Date;
  sexo: 'MASCULINO' | 'FEMININO' | 'NAODEFINIDO';
  escolaridade: 'GRADUACAO' | 'POSGRADUACAO' | 'MESTRADO' | 'DOUTORADO';
  endereco: string;
  avatar: string | null;
}

export class Employee extends Entity<IEmployee> {
  private constructor(props: IEmployee, id?: string) {
    super(props, id);
  }

  static create(props: IEmployee, id?: string) {
    const employee = new Employee(props, id);
    return employee;
  }
}
