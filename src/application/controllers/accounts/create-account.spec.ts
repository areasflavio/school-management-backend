import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { EmailValidator } from '@core/helpers/email-validator';
import { IAccount } from '@domain/entities/account';
import { CreateAccount } from '@domain/use-cases/account';
import { CreateAccountController } from './create-account';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeCreateAccount = (
  accountRepository: AccountRepository
): CreateAccount => {
  class CreateAccountStub implements CreateAccount {
    constructor(private accountRepository: AccountRepository) {}
    async execute(account: IAccount): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new CreateAccountStub(accountRepository);
};

interface SutTypes {
  sut: CreateAccountController;
  emailValidatorStub: EmailValidator;
  createAccountStub: CreateAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const accountRepository = new InMemoryAccountRepository();
  const createAccountStub = makeCreateAccount(accountRepository);
  const sut = new CreateAccountController(
    emailValidatorStub,
    createAccountStub
  );
  return {
    sut,
    emailValidatorStub,
    createAccountStub,
  };
};

describe('Create Account Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    );
  });

  test('should return 400 if password and passwordConfirmation not matches', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'not-match-password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new Error('Invalid param: passwordConfirmation')
    );
  });

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    vi.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'not-valid-email',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Invalid param: email'));
  });

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = vi.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('email@example.com');
  });

  test('should return 400 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    vi.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('Error message.');
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should call CreateAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut();
    const createAccountSpy = vi.spyOn(createAccountStub, 'execute');
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    await sut.handle(httpRequest);
    expect(createAccountSpy).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: 'password',
    });
  });

  test('should return 400 if CreateAccount throws an Error instance', async () => {
    const { sut, createAccountStub } = makeSut();
    vi.spyOn(createAccountStub, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut();
    vi.spyOn(createAccountStub, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
