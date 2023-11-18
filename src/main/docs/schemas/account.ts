export const accountData = {
  email: {
    description: 'Email do usuário',
    type: 'string',
    example: 'joao@example.com',
  },
  password: {
    description: 'Senha do usuário',
    type: 'string',
    example: '123456',
  },
  role: {
    description: 'Permissão do usuário',
    type: 'string',
    enum: ['ADMIN', 'USER'],
    example: 'ADMIN',
  },
};

const accountDataDisplay = {
  email: {
    description: 'Email do usuário',
    type: 'string',
    example: 'joao@example.com',
  },
  role: {
    description: 'Permissão do usuário',
    type: 'string',
    enum: ['ADMIN', 'USER'],
    example: 'ADMIN',
  },
};

export const account = {
  type: 'object',
  properties: {
    _id: {
      description: 'Id do usuário',
      type: 'string',
      format: 'uuid',
    },
    props: {
      description: 'Propriedades do usuário',
      type: 'object',
      properties: {
        ...accountDataDisplay,
      },
    },
  },
  required: [],
};
