import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { Account } from '@domain/entities/account';
import { GetAccountById } from '@domain/use-cases/account';
import { GetAccountByIdController } from './get-account-by-id';

const makeGetAccountById = (
  accountRepository: AccountRepository
): GetAccountById => {
  class GetAccountByIdStub implements GetAccountById {
    constructor(private accountRepository: AccountRepository) {}
    async execute(id: string): Promise<Account | null> {
      return await Promise.resolve(null);
    }
  }
  return new GetAccountByIdStub(accountRepository);
};

interface SutTypes {
  sut: GetAccountByIdController;
  getAccountById: GetAccountById;
}

const makeSut = (): SutTypes => {
  const accountRepository = new InMemoryAccountRepository();
  const getAccountById = makeGetAccountById(accountRepository);
  const sut = new GetAccountByIdController(getAccountById);
  return {
    sut,
    getAccountById,
  };
};

describe('Get Account By Id Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call GetAccountById with correct values', async () => {
    const { sut, getAccountById } = makeSut();
    const getAccountByIdSpy = vi.spyOn(getAccountById, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(getAccountByIdSpy).toHaveBeenCalledWith('id');
  });

  test('should return 500 if GetAccountById throws', async () => {
    const { sut, getAccountById } = makeSut();
    vi.spyOn(getAccountById, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
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

  test('should return null if no Account were found', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toBe(null);
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
