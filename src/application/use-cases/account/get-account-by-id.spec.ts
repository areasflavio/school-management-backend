import { describe, expect, it, vi } from 'vitest';

import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbGetAccountById } from './get-account-by-id';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbGetAccountById(inMemoryAccountRepository);
  return {
    sut,
    accountRepository: inMemoryAccountRepository,
  };
};

const makeAccounts = async (accountRepository: InMemoryAccountRepository) => {
  await accountRepository.create(
    {
      email: 'account1@example.com',
      password: 'password',
      role: 'USER',
    },
    'id1'
  );
  await accountRepository.create(
    {
      email: 'account2@example.com',
      password: 'password',
      role: 'USER',
    },
    'id2'
  );
  await accountRepository.create(
    {
      email: 'account3@example.com',
      password: 'password',
      role: 'USER',
    },
    'id3'
  );
};

describe('Get account by id use case', () => {
  it('should get null if no account were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('id');
    expect(result).toEqual(null);
  });

  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    await makeAccounts(accountRepository);
    const getSpy = vi.spyOn(accountRepository, 'getById');
    await sut.execute('id1');
    expect(getSpy).toHaveBeenCalledWith('id1');
  });

  it('should get a account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    const result = await sut.execute('id1');
    expect(result).toEqual(
      expect.objectContaining({
        props: {
          email: 'account1@example.com',
          password: 'password',
          role: 'USER',
        },
      })
    );
  });
});
