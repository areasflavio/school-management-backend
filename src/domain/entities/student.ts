import { Entity } from '@core/domain/entity';

export interface IStudent {
  matricula: number;
  nome: string;
  status: 'ATIVO' | 'INATIVO';
  serie: string;
  email: string;
  RG: string | null;
  CPF: string | null;
  nascimento: Date;
  sexo: 'MASCULINO' | 'FEMININO' | 'NAODEFINIDO';
  endereco: string;
  emailResponsavel: string;
  nomePai: string | null;
  telefonePai: string | null;
  nomeMae: string | null;
  telefoneMae: string | null;
  avatar: string | null;
}

export class Student extends Entity<IStudent> {
  private constructor(props: IStudent, id?: string) {
    super(props, id);
  }

  static create(props: IStudent, id?: string) {
    const student = new Student(props, id);
    return student;
  }
}
