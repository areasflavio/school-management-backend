import { describe, expect, it, vi } from 'vitest';

import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbGetAccountByEmail } from './get-account-by-email';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbGetAccountByEmail(inMemoryAccountRepository);
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
};

describe('Get account by email use case', () => {
  it('should get null if no account were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('account1@example.com');
    expect(result).toEqual(null);
  });

  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    await makeAccounts(accountRepository);
    const getSpy = vi.spyOn(accountRepository, 'getByEmail');
    await sut.execute('account1@example.com');
    expect(getSpy).toHaveBeenCalledWith('account1@example.com');
  });

  it('should get a account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await makeAccounts(accountRepository);
    const result = await sut.execute('account1@example.com');
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
