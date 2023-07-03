import { describe, expect, it, vi } from 'vitest';

import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbDeleteAccount } from './delete-account';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbDeleteAccount(inMemoryAccountRepository);
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

describe('Delete account use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id');
    expect(promise).rejects.toThrow();
  });

  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    await makeAccounts(accountRepository);
    const deleteSpy = vi.spyOn(accountRepository, 'delete');
    await sut.execute('id1');
    expect(deleteSpy).toHaveBeenCalledWith('id1');
  });

  it('should delete a account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    await sut.execute('id1');
    expect(accountRepository.accounts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            email: 'account1@example.com',
          },
        }),
      ])
    );
  });
});
