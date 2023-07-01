import { describe, expect, it, vi } from 'vitest';

import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { Encrypter } from '@core/helpers/encrypter';
import { Tokenizer } from '@core/helpers/tokenizer';
import { Authenticate } from '@domain/use-cases/auth';
import { DbAuthenticate } from './authenticate';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('hashedPassword');
    }
    async compare(value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true);
    }
  }
  return new EncrypterStub();
};

const makeTokenizer = (): Tokenizer => {
  class TokenizerStub implements Tokenizer {
    sign(value: string): Promise<string> {
      return Promise.resolve('token');
    }
    verify(token: string): Promise<string | undefined> {
      return Promise.resolve('value');
    }
  }
  return new TokenizerStub();
};

interface SutTypes {
  sut: Authenticate;
  encrypterStub: Encrypter;
  accountRepository: AccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const tokenizerStub = makeTokenizer();
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbAuthenticate(
    encrypterStub,
    inMemoryAccountRepository,
    tokenizerStub
  );
  return {
    sut,
    accountRepository: inMemoryAccountRepository,
    encrypterStub,
  };
};

const makeHttpAuthenticateBody = () => {
  return {
    email: 'email@example.com',
    password: 'password',
  };
};

const makeAccounts = async (accountRepository: AccountRepository) => {
  await accountRepository.create({
    email: 'email@example.com',
    password: 'password',
  });
};

describe('Authenticate use case', () => {
  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    await makeAccounts(accountRepository);
    const createSpy = vi.spyOn(accountRepository, 'getByEmail');
    await sut.execute(makeHttpAuthenticateBody());
    expect(createSpy).toHaveBeenCalledWith('email@example.com');
  });

  it('should throw if a provided email is not registered', async () => {
    const { sut } = makeSut();
    const promise = sut.execute({
      email: 'email@example.com',
      password: 'password',
    });
    expect(promise).rejects.toThrow();
  });

  it('should throw if a provided password not matches the account password', async () => {
    const { sut, accountRepository, encrypterStub } = makeSut();
    await makeAccounts(accountRepository);
    vi.spyOn(encrypterStub, 'compare').mockReturnValueOnce(
      Promise.resolve(false)
    );
    const promise = sut.execute({
      email: 'email@example.com',
      password: 'wrongPassword',
    });
    expect(promise).rejects.toThrow();
  });

  it('should create authenticate on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    const token = await sut.execute(makeHttpAuthenticateBody());
    expect(token).toBeTruthy();
  });
});
