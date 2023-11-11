import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import {
  AccountRepository,
  UpdateAccountData,
} from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { UpdateAccount } from '@domain/use-cases/account';
import { UpdateAccountController } from './update-account';

const makeUpdateAccount = (
  accountRepository: AccountRepository
): UpdateAccount => {
  class UpdateAccountStub implements UpdateAccount {
    constructor(private accountRepository: AccountRepository) {}
    async execute(id: string, data: UpdateAccountData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new UpdateAccountStub(accountRepository);
};

interface SutTypes {
  sut: UpdateAccountController;
  updateAccount: UpdateAccount;
}

const makeSut = (): SutTypes => {
  const accountRepository = new InMemoryAccountRepository();
  const updateAccount = makeUpdateAccount(accountRepository);
  const sut = new UpdateAccountController(updateAccount);
  return {
    sut,
    updateAccount,
  };
};

describe('Update Account Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call UpdateAccount with correct values', async () => {
    const { sut, updateAccount } = makeSut();
    const updateAccountSpy = vi.spyOn(updateAccount, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    await sut.handle(httpRequest);
    expect(updateAccountSpy).toHaveBeenCalledWith('id', {
      nome: 'nome',
      email: 'email@example.com',
      avatar: null,
    });
  });

  test('should return 400 if UpdateAccount throws an Error instance', async () => {
    const { sut, updateAccount } = makeSut();
    vi.spyOn(updateAccount, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if UpdateAccount throws', async () => {
    const { sut, updateAccount } = makeSut();
    vi.spyOn(updateAccount, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'id',
      },
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
