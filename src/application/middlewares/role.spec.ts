import { describe, expect, test, vi } from 'vitest';

import { ServerError, UnauthorizedError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { Tokenizer } from '@core/helpers/tokenizer';
import { RoleMiddleware } from './role';

const makeTokenizer = (): Tokenizer => {
  class TokenizerStub implements Tokenizer {
    sign(value: string): Promise<string> {
      return Promise.resolve('token');
    }
    verify(token: string): Promise<string | undefined> {
      return Promise.resolve('id1');
    }
  }
  return new TokenizerStub();
};

interface SutTypes {
  sut: RoleMiddleware;
  tokenizerStub: Tokenizer;
  accountRepository: AccountRepository;
}

const makeSut = (): SutTypes => {
  const tokenizerStub = makeTokenizer();
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new RoleMiddleware(
    ['ADMIN'],
    tokenizerStub,
    inMemoryAccountRepository
  );
  return {
    sut,
    tokenizerStub,
    accountRepository: inMemoryAccountRepository,
  };
};

const makeAccount = async (
  accountRepository: InMemoryAccountRepository,
  { role = 'USER' }: { role?: 'ADMIN' | 'USER' }
) => {
  await accountRepository.create(
    {
      email: 'account1@example.com',
      password: 'password',
      role,
    },
    'id1'
  );
  return accountRepository.getById('id1');
};

describe('RoleMiddleware', () => {
  test('should call AccountRepository with correct data', async () => {
    const { sut, accountRepository } = makeSut();
    const getByIdSpy = vi.spyOn(accountRepository, 'getById');
    await sut.handle({
      accessToken: 'token',
    });
    expect(getByIdSpy).toHaveBeenCalledWith('id1');
  });

  test('should return 401 if account is not found', async () => {
    const { sut, accountRepository } = makeSut();
    vi.spyOn(accountRepository, 'getById').mockReturnValueOnce(
      Promise.resolve(null)
    );
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test('should return 401 if account does not have role', async () => {
    const { sut, accountRepository } = makeSut();
    vi.spyOn(accountRepository, 'getById').mockReturnValueOnce(
      Promise.resolve(
        makeAccount(accountRepository as InMemoryAccountRepository, {
          role: 'USER',
        })
      )
    );
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test('should return 400 if an RoleMiddleware throws an Error instance', async () => {
    const { sut, tokenizerStub } = makeSut();
    vi.spyOn(tokenizerStub, 'verify').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if an RoleMiddleware throws', async () => {
    const { sut, tokenizerStub } = makeSut();
    vi.spyOn(tokenizerStub, 'verify').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 if account does have role', async () => {
    const { sut, accountRepository } = makeSut();
    vi.spyOn(accountRepository, 'getById').mockReturnValueOnce(
      Promise.resolve(
        makeAccount(accountRepository as InMemoryAccountRepository, {
          role: 'ADMIN',
        })
      )
    );
    const httpResponse = await sut.handle({
      accessToken: 'token',
    });
    expect(httpResponse.statusCode).toBe(200);
  });
});
