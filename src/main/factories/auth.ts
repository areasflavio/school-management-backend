import { SignInController } from '@application/controllers/auth/sign-in';
import { SignUpController } from '@application/controllers/auth/sign-up';
import { AuthMiddleware } from '@application/middlewares/auth';
import { PrismaAccountRepository } from '@application/repositories/prisma/account';
import { DbCreateAccount } from '@application/use-cases/account/create-account';
import { DbAuthenticate } from '@application/use-cases/auth/authenticate';
import { BcryptAdapter } from '@main/adapter/bcrypt-encrypter';
import { EmailValidatorAdapter } from '@main/adapter/email-validator';
import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import env from '@main/config/env';

export const makeSignUpController = (): SignUpController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(12);
  const createAccount = new DbCreateAccount(encrypter, prismaAccountRepository);
  return new SignUpController(emailValidator, createAccount);
};

export const makeSignInController = (): SignInController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(12);
  const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
  const authenticate = new DbAuthenticate(
    encrypter,
    prismaAccountRepository,
    tokenizer
  );
  return new SignInController(emailValidator, authenticate);
};

export const makeEnsureAuthenticate = () => {
  const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
  return new AuthMiddleware(tokenizer);
};
