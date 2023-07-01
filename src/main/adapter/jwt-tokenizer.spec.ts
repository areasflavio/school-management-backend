import jwt from 'jsonwebtoken';
import { describe, expect, test, vi } from 'vitest';

import { JWTTokenizerAdapter } from './jwt-tokenizer';

const secret = 'secret';
const expirationTime = 1000 * 60 * 60 * 24; // 1 day

const makeSut = (): JWTTokenizerAdapter => {
  return new JWTTokenizerAdapter(secret, expirationTime);
};

describe('JWT Adapter', () => {
  test('should call jwt sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = vi.spyOn(jwt, 'sign');
    sut.sign('value');
    expect(signSpy).toBeCalledWith({ value: 'value' }, secret, {
      expiresIn: expirationTime,
    });
  });

  test('should return a token on jwt sign success', async () => {
    const sut = makeSut();
    vi.spyOn(jwt, 'sign').mockReturnValueOnce('token' as unknown as void);
    const token = await sut.sign('value');
    expect(token).toBe('token');
  });

  test('should call jwt verify with correct values', async () => {
    const sut = makeSut();
    const verifySpy = vi.spyOn(jwt, 'verify');
    const token = await sut.sign('value');
    sut.verify(token);
    expect(verifySpy).toBeCalledWith(token, secret);
  });

  test('should return a payload on jwt verify success', async () => {
    const sut = makeSut();
    vi.spyOn(jwt, 'verify').mockReturnValueOnce({
      value: 'verified',
    } as unknown as void);
    const token = await sut.verify('token');
    expect(token).toBe('verified');
  });
});
