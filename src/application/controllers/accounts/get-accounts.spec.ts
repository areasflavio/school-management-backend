import { describe, expect, test, vi } from 'vitest';

import { ServerError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { Account } from '@domain/entities/account';
import { GetAccounts } from '@domain/use-cases/account';
import { GetAccountsController } from './get-accounts';

const makeGetAccounts = (accountRepository: AccountRepository): GetAccounts => {
  class GetAccountsStub implements GetAccounts {
    constructor(private accountRepository: AccountRepository) {}
    async execute(): Promise<Account[]> {
      return await Promise.resolve([]);
    }
  }
  return new GetAccountsStub(accountRepository);
};

interface SutTypes {
  sut: GetAccountsController;
  getAccounts: GetAccounts;
}

const makeSut = (): SutTypes => {
  const accountRepository = new InMemoryAccountRepository();
  const getAccounts = makeGetAccounts(accountRepository);
  const sut = new GetAccountsController(getAccounts);
  return {
    sut,
    getAccounts,
  };
};

describe('Get Account Controller', () => {
  test('should call GetAccounts', async () => {
    const { sut, getAccounts } = makeSut();
    const getAccountsSpy = vi.spyOn(getAccounts, 'execute');
    await sut.handle();
    expect(getAccountsSpy).toHaveBeenCalled();
  });

  test('should return 500 if GetAccounts throws', async () => {
    const { sut, getAccounts } = makeSut();
    vi.spyOn(getAccounts, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(200);
  });
});
