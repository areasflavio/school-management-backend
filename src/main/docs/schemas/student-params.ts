import { studentData } from './student';

export const createStudentParams = {
  type: 'object',
  properties: {
    ...studentData,
  },
  required: [
    'matricula',
    'nome',
    'status',
    'serie',
    'email',
    'nascimento',
    'sexo',
    'endereco',
    'emailResponsavel',
    'file',
  ],
};
export const updateStudentParams = {
  type: 'object',
  ...studentData,
  required: [],
};
