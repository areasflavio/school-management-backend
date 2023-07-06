export const student = {
  get: {
    tags: ['Alunos'],
    summary: 'API para listar todas os alunos',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/student',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  post: {
    tags: ['Alunos'],
    summary: 'API para criar um aluno',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/student',
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
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
