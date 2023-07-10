export const employeeData = {
  registro: {
    description: 'Registro do funcionário',
    type: 'number',
    example: 123,
  },
  nome: {
    description: 'Nome do funcionário',
    type: 'string',
    example: 'João da Silva',
  },
  email: {
    description: 'Email do funcionário',
    type: 'string',
    example: 'joao@example.com',
  },
  status: {
    description: 'Status do funcionário',
    type: 'string',
    enum: ['ATIVO', 'INATIVO'],
    example: 'ATIVO',
  },
  vinculo: {
    description: 'Vinculo do funcionário',
    type: 'string',
    enum: ['CONTRATADO', 'CONCURSADO', 'SUBSTITUTO'],
    example: 'CONTRATADO',
  },
  admissao: {
    description: 'Data de admissao do funcionário',
    type: 'string',
    format: 'date',
    example: '2020-01-01T00:00:00.00Z',
  },
  cargo: {
    description: 'Cargo do funcionário',
    type: 'string',
    enum: ['DIRECAO', 'COORDENACAO', 'SECRETARIA', 'PROFESSOR'],
    example: 'PROFESSOR',
  },
  RG: {
    description: 'RG do funcionário',
    type: 'string',
    example: 'BR12345678',
  },
  CPF: {
    description: 'CPF do funcionário',
    type: 'string',
    example: '123456789',
  },
  nascimento: {
    description: 'Data de nascimento do funcionário',
    type: 'string',
    format: 'date',
    example: '1990-01-01T00:00:00.00Z',
  },
  sexo: {
    description: 'Sexo do funcionário',
    type: 'string',
    enum: ['MASCULINO', 'FEMININO', 'NAODEFINIDO'],
    example: 'MASCULINO',
  },
  escolaridade: {
    description: 'Escolaridade do funcionário',
    type: 'string',
    enum: ['GRADUACAO', 'POSGRADUACAO', 'MESTRADO', 'DOUTORADO'],
    example: 'GRADUACAO',
  },
  endereco: {
    description: 'Endereço do funcionário',
    type: 'string',
    example: 'Rua Nova',
  },
  file: {
    description: 'Avatar do funcionário',
    type: 'string',
    format: 'base64',
  },
};

export const employee = {
  type: 'object',
  properties: {
    _id: {
      description: 'Id do funcionário',
      type: 'string',
      format: 'uuid',
    },
    props: {
      description: 'Propriedades do funcionário',
      type: 'object',
      properties: {
        ...employeeData,
      },
    },
  },
  required: [],
};
