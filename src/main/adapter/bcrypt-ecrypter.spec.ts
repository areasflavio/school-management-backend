import bcrypt from 'bcrypt';
import { describe, expect, test, vi } from 'vitest';

import { BcryptAdapter } from './bcrypt-encrypter';

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = vi.spyOn(bcrypt, 'hash');
    await sut.encrypt('value');
    expect(hashSpy).toBeCalledWith('value', salt);
  });

  test('should return a hash on success', async () => {
    const sut = makeSut();
    vi.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      await Promise.resolve('hash' as unknown as void)
    );
    const hash = await sut.encrypt('value');
    expect(hash).toBe('hash');
  });
});
