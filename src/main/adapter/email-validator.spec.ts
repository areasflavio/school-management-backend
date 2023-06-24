import validator from 'validator';
import { describe, expect, test, vi } from 'vitest';

import { EmailValidatorAdapter } from './email-validator';

vi.mock('validator', async () => {
  const actual: object = await vi.importActual('validator');
  return {
    ...actual,
    isEmail(): boolean {
      return true;
    },
  };
});

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe('Email Validator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut();
    vi.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@example.com');
    expect(isValid).toBe(false);
  });

  test('should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_email@example.com');
    expect(isValid).toBe(true);
  });

  test('should call validator with correct email', () => {
    const sut = makeSut();
    const isEmailSpy = vi.spyOn(validator, 'isEmail');
    sut.isValid('valid_email@example.com');
    expect(isEmailSpy).toBeCalledWith('valid_email@example.com');
  });
});
