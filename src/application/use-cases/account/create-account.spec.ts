import { describe, expect, it, vi } from 'vitest';

import {
  AccountRepository,
  CreateAccountData,
} from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { Encrypter } from '@core/helpers/encrypter';
import { CreateAccount } from '@domain/use-cases/account';
import { DbCreateAccount } from './create-account';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('hashedPassword');
    }
  }
  return new EncrypterStub();
};

interface SutTypes {
  sut: CreateAccount;
  encrypterStub: Encrypter;
  accountRepository: AccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbCreateAccount(encrypterStub, inMemoryAccountRepository);
  return {
    sut,
    accountRepository: inMemoryAccountRepository,
    encrypterStub,
  };
};

const makeHttpAccountBody = (): CreateAccountData => {
  return {
    email: 'email@example.com',
    password: 'password',
  };
};

describe('Create account use case', () => {
  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    const createSpy = vi.spyOn(accountRepository, 'create');
    await sut.execute(makeHttpAccountBody());
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'email@example.com',
        password: 'hashedPassword',
      })
    );
  });

  it('should throw if a provided email is already registered', async () => {
    const { sut } = makeSut();
    await sut.execute(makeHttpAccountBody());
    const promise = sut.execute(makeHttpAccountBody());
    expect(promise).rejects.toThrow();
  });

  it('should create a new account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await sut.execute(makeHttpAccountBody());
    expect(accountRepository.accounts.length).toBe(1);
    expect(accountRepository.accounts[0].id).toBeTruthy();
    expect(accountRepository.accounts[0]).toEqual(
      expect.objectContaining({
        props: {
          email: 'email@example.com',
          password: 'hashedPassword',
        },
      })
    );
  });
});
