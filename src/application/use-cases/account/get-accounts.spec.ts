import { describe, expect, it } from 'vitest';

import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbGetAccounts } from './get-accounts';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbGetAccounts(inMemoryAccountRepository);
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

describe('Get accounts use case', () => {
  it('should get an empty array of accounts if no account were created', async () => {
    const { sut } = makeSut();
    const results = await sut.execute();
    expect(results.length).toEqual(0);
    expect(results).toEqual(expect.arrayContaining([]));
  });

  it('should get an array of accounts on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    const results = await sut.execute();
    expect(results.length).toEqual(3);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            email: 'account1@example.com',
            password: 'password',
            role: 'USER',
          },
        }),
      ])
    );
  });
});
