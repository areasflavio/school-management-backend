import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DeleteAccount } from '@domain/use-cases/account';
import { DeleteAccountController } from './delete-account';

const makeDeleteAccount = (
  accountRepository: AccountRepository
): DeleteAccount => {
  class DeleteAccountStub implements DeleteAccount {
    constructor(private accountRepository: AccountRepository) {}
    async execute(id: string): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new DeleteAccountStub(accountRepository);
};

interface SutTypes {
  sut: DeleteAccountController;
  deleteAccount: DeleteAccount;
}

const makeSut = (): SutTypes => {
  const accountRepository = new InMemoryAccountRepository();
  const deleteAccount = makeDeleteAccount(accountRepository);
  const sut = new DeleteAccountController(deleteAccount);
  return {
    sut,
    deleteAccount,
  };
};

describe('Update Account Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call DeleteAccount with correct values', async () => {
    const { sut, deleteAccount } = makeSut();
    const deleteAccountSpy = vi.spyOn(deleteAccount, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(deleteAccountSpy).toHaveBeenCalledWith('id');
  });

  test('should return 400 if DeleteAccount throws an instance', async () => {
    const { sut, deleteAccount } = makeSut();
    vi.spyOn(deleteAccount, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if DeleteAccount throws', async () => {
    const { sut, deleteAccount } = makeSut();
    vi.spyOn(deleteAccount, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      params: {
        id: 'id',
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
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
