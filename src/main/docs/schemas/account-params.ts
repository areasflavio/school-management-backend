import { accountData } from './account';

export const createAccountParams = {
  type: 'object',
  properties: {
    ...accountData,
  },
  required: ['email', 'password'],
};

export const updateAccountParams = {
  type: 'object',
  properties: {
    ...accountData,
  },
  required: [],
};
