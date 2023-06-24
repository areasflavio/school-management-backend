import { SignUpController } from '@application/controllers/auth/sign-up';
import { PrismaAccountRepository } from '@application/repositories/prisma/account';
import { DbCreateAccount } from '@application/use-cases/account/create-account';
import { BcryptAdapter } from '@main/adapter/bcrypt-encrypter';
import { EmailValidatorAdapter } from '@main/adapter/email-validator';

export const makeSignUpController = (): SignUpController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(12);
  const createAccount = new DbCreateAccount(encrypter, prismaAccountRepository);
  return new SignUpController(emailValidator, createAccount);
};
