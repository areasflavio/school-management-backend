export const accountId = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Usuários'],
    summary: 'API para visualizar detalhes de um usuário',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do usuário',
        required: true,
        type: 'string',
        format: 'uuid',
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account',
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
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Usuários'],
    summary: 'API para atualizar dados um usuário',
    description: 'Essa rota só pode ser executada por **administradores**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do usuário',
        required: true,
        type: 'string',
        format: 'uuid',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/updateAccountParams',
          },
        },
      },
    },
    responses: {
      200: {
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
  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Usuários'],
    summary: 'API para remover um usuário',
    description: 'Essa rota só pode ser executada por **administradores**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do usuário',
        required: true,
        type: 'string',
        format: 'uuid',
      },
    ],
    responses: {
      200: {
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
