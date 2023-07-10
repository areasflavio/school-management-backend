export const employeeId = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Funcionários'],
    summary: 'API para visualizar detalhes de um funcionário',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do funcionário',
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
              $ref: '#/schemas/employee',
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
    tags: ['Funcionários'],
    summary: 'API para atualizar dados um funcionário',
    description: 'Essa rota só pode ser executada por **administradores**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do funcionário',
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
            $ref: '#/schemas/updateEmployeeParams',
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
    tags: ['Funcionários'],
    summary: 'API para remover um funcionário',
    description: 'Essa rota só pode ser executada por **administradores**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do funcionário',
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
