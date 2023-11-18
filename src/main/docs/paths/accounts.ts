export const account = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Usuários'],
    summary: 'API para listar todas os usuários',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/account',
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Usuários'],
    summary: 'API para criar um usuário',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/createAccountParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Sucesso, mas sem dados para exibir',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
