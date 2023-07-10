import { employeeData } from './employee';

export const createEmployeeParams = {
  type: 'object',
  properties: {
    ...employeeData,
  },
  required: [
    'registro',
    'nome',
    'email',
    'status',
    'vinculo',
    'admissao',
    'cargo',
    'RG',
    'CPF',
    'nascimento',
    'sexo',
    'escolaridade',
    'endereco',
    'file',
  ],
};

export const updateEmployeeParams = {
  type: 'object',
  properties: {
    ...employeeData,
  },
  required: [],
};
