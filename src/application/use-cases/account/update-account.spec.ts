import { describe, expect, it, vi } from 'vitest';

import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbUpdateAccount } from './update-account';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbUpdateAccount(inMemoryAccountRepository);
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
    },
    'id1'
  );
};

describe('Update account use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id', {
      password: 'new-password',
    });
    expect(promise).rejects.toThrow();
  });

  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    await makeAccounts(accountRepository);
    const updateSpy = vi.spyOn(accountRepository, 'update');
    await sut.execute('id1', {
      password: 'new-password',
    });
    expect(updateSpy).toHaveBeenCalledWith('id1', {
      password: 'new-password',
    });
  });

  it('should update a account on success even if no data is provided', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    await sut.execute('id1', {});
    expect(accountRepository.accounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            email: 'account1@example.com',
            password: 'password',
          },
        }),
      ])
    );
  });

  it('should update a account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    await sut.execute('id1', {
      password: 'new-password',
    });
    expect(accountRepository.accounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            email: 'account1@example.com',
            password: 'new-password',
          },
        }),
      ])
    );
  });
});
