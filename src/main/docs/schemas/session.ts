export const session = {
  type: 'object',
  properties: {
    accessToken: {
      description: 'Token de acesso',
      type: 'string',
    },
  },
  required: ['accessToken'],
};
