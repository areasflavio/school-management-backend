import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'API - Sistema de gerenciamento de escolas',
    description:
      'Essa é a documentação da API do projeto de gerenciamento de escolas, feita para auxiliar no controle de alunos e funcionários.',
    version: '1.0.0',
    contact: {
      name: '',
      email: '',
      url: '',
    },
    license: {
      name: 'MIT License',
      url: 'https://github.com/paulojr-eco/COM222-Backend/blob/main/LICENSE',
    },
  },
  externalDocs: {
    description: 'Link para o repositório do projeto frontend',
    url: 'https://github.com/paulojr-eco/COM222-Frontend',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Login',
      description: 'APIs relacionadas a Login',
    },
    {
      name: 'Alunos',
      description: 'APIs relacionadas a Alunos',
    },
    {
      name: 'Funcionários',
      description: 'APIs relacionadas a Funcionários',
    },
  ],
  paths,
  schemas,
  components,
};
