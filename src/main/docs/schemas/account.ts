export const account = {
  type: 'object',
  properties: {
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
  },
  required: [],
};
