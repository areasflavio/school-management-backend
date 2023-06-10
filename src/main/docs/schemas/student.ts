export const student = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    matricula: {
      type: 'string',
    },
    nome: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['ATIVO', 'INATIVO'],
    },
    serie: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    RG: {
      type: 'string',
      nullable: true,
    },
    CPF: {
      type: 'string',
      nullable: true,
    },
    nascimento: {
      type: 'string',
      format: 'date',
    },
    sexo: {
      type: 'string',
      enum: ['MASCULINO', 'FEMININO', 'NAODEFINIDO'],
    },
    endereco: {
      type: 'string',
    },
    emailResponsavel: {
      type: 'string',
    },
    nomePai: {
      type: 'string',
      nullable: true,
    },
    telefonePai: {
      type: 'string',
      nullable: true,
    },
    nomeMae: {
      type: 'string',
      nullable: true,
    },
    telefoneMae: {
      type: 'string',
      nullable: true,
    },
  },
  required: [
    'id',
    'matricula',
    'nome',
    'status',
    'serie',
    'email',
    'RG',
    'CPF',
    'nascimento',
    'sexo',
    'endereco',
    'emailResponsavel',
    'nomePai',
    'telefonePai',
    'nomeMae',
    'telefoneMae',
  ],
};
