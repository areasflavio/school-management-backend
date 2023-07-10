export const studentData = {
  matricula: {
    description: 'Matricula do aluno',
    type: 'number',
    example: 123,
  },
  nome: {
    description: 'Nome do aluno',
    type: 'string',
    example: 'João da Silva',
  },
  status: {
    description: 'Status do aluno',
    type: 'string',
    enum: ['ATIVO', 'INATIVO'],
    example: 'ATIVO',
  },
  serie: {
    description: 'Série do aluno',
    type: 'string',
    example: '1o ano',
  },
  email: {
    description: 'Email do aluno',
    type: 'string',
    example: 'joaozinho@example.com',
  },
  RG: {
    description: 'RG do aluno',
    type: 'string',
    nullable: true,
    example: 'BR12345678',
  },
  CPF: {
    description: 'CPF do aluno',
    type: 'string',
    nullable: true,
    example: '123456789',
  },
  nascimento: {
    description: 'Data de nascimento do aluno',
    type: 'string',
    format: 'date',
    example: '2000-01-01T00:00:00.00Z',
  },
  sexo: {
    description: 'Sexo do aluno',
    type: 'string',
    enum: ['MASCULINO', 'FEMININO', 'NAODEFINIDO'],
    example: 'MASCULINO',
  },
  endereco: {
    description: 'Endereço do aluno',
    type: 'string',
    example: 'Rua Nova',
  },
  emailResponsavel: {
    description: 'Email do responsável',
    type: 'string',
    example: 'joao@example.com',
  },
  nomePai: {
    description: 'Nome do pai',
    type: 'string',
    nullable: true,
    example: 'João da Silva',
  },
  telefonePai: {
    description: 'Telefone do pai',
    type: 'string',
    nullable: true,
    example: '1234567890',
  },
  nomeMae: {
    description: 'Nome da mae',
    type: 'string',
    nullable: true,
    example: 'Maria da Silva',
  },
  telefoneMae: {
    description: 'Telefone da mae',
    type: 'string',
    nullable: true,
    example: '1234567890',
  },
  file: {
    description: 'Avatar do aluno',
    type: 'string',
    format: 'base64',
  },
};

export const student = {
  type: 'object',
  properties: {
    _id: {
      description: 'Id do aluno',
      type: 'string',
      format: 'uuid',
    },
    props: {
      description: 'Propriedades do aluno',
      type: 'object',
      ...studentData,
    },
  },
  required: [],
};
