import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { AccountRepository } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { EmailValidator } from '@core/helpers/email-validator';
import { Encrypter } from '@core/helpers/encrypter';
import { Tokenizer } from '@core/helpers/tokenizer';
import { Authenticate, AuthenticateData } from '@domain/use-cases/auth';
import { SignInController } from './sign-in';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('hashedPassword');
    }
    async compare(value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true);
    }
  }
  return new EncrypterStub();
};

const makeTokenizer = (): Tokenizer => {
  class TokenizerStub implements Tokenizer {
    sign(value: string): Promise<string> {
      return Promise.resolve('token');
    }
    verify(token: string): Promise<string | undefined> {
      return Promise.resolve('value');
    }
  }
  return new TokenizerStub();
};

const makeAuthenticate = (
  encrypter: Encrypter,
  accountRepository: AccountRepository,
  tokenizer: Tokenizer
): Authenticate => {
  class AuthenticateStub implements Authenticate {
    constructor(
      private readonly encrypter: Encrypter,
      private accountRepository: AccountRepository,
      private readonly tokenizer: Tokenizer
    ) {}
    async execute(data: AuthenticateData): Promise<string> {
      return await Promise.resolve('any_token');
    }
  }
  return new AuthenticateStub(encrypter, accountRepository, tokenizer);
};

interface SutTypes {
  sut: SignInController;
  emailValidatorStub: EmailValidator;
  authenticateStub: Authenticate;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const encrypterStub = makeEncrypter();
  const accountRepository = new InMemoryAccountRepository();
  const tokenizerStub = makeTokenizer();
  const authenticateStub = makeAuthenticate(
    encrypterStub,
    accountRepository,
    tokenizerStub
  );
  const sut = new SignInController(emailValidatorStub, authenticateStub);
  return {
    sut,
    emailValidatorStub,
    authenticateStub,
  };
};

describe('SignIn Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'password',
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
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    vi.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'not-valid-email',
        password: 'password',
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
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should call Authenticate with correct values', async () => {
    const { sut, authenticateStub } = makeSut();
    const createAccountSpy = vi.spyOn(authenticateStub, 'execute');
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
      },
    };
    await sut.handle(httpRequest);
    expect(createAccountSpy).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: 'password',
    });
  });

  test('should return 400 if Authenticate throws an Error instance', async () => {
    const { sut, authenticateStub } = makeSut();
    vi.spyOn(authenticateStub, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error('Error message.'));
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Error message.'));
  });

  test('should return 500 if Authenticate throws', async () => {
    const { sut, authenticateStub } = makeSut();
    vi.spyOn(authenticateStub, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject();
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: 'password',
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
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toHaveProperty('accessToken');
  });
});
