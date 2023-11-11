import { CreateAccountController } from '@application/controllers/accounts/create-account';
import { DeleteAccountController } from '@application/controllers/accounts/delete-account';
import { GetAccountByIdController } from '@application/controllers/accounts/get-account-by-id';
import { GetAccountsController } from '@application/controllers/accounts/get-accounts';
import { UpdateAccountController } from '@application/controllers/accounts/update-account';
import { PrismaAccountRepository } from '@application/repositories/prisma/account';
import { DbCreateAccount } from '@application/use-cases/account/create-account';
import { DbDeleteAccount } from '@application/use-cases/account/delete-account';
import { DbGetAccountById } from '@application/use-cases/account/get-account-by-id';
import { DbGetAccounts } from '@application/use-cases/account/get-accounts';
import { DbUpdateAccount } from '@application/use-cases/account/update-account';
import { BcryptAdapter } from '@main/adapter/bcrypt-encrypter';
import { EmailValidatorAdapter } from '@main/adapter/email-validator';

export const makeCreateAccountController = (): CreateAccountController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(12);
  const createAccount = new DbCreateAccount(encrypter, prismaAccountRepository);
  return new CreateAccountController(emailValidator, createAccount);
};

export const makeGetAccountsController = (): GetAccountsController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const getAccounts = new DbGetAccounts(prismaAccountRepository);
  return new GetAccountsController(getAccounts);
};

export const makeGetAccountByIdController = (): GetAccountByIdController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const getAccountById = new DbGetAccountById(prismaAccountRepository);
  return new GetAccountByIdController(getAccountById);
};

export const makeUpdateAccountController = (): UpdateAccountController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const updateAccount = new DbUpdateAccount(prismaAccountRepository);
  return new UpdateAccountController(updateAccount);
};

export const makeDeleteAccountController = (): DeleteAccountController => {
  const prismaAccountRepository = new PrismaAccountRepository();
  const deleteAccount = new DbDeleteAccount(prismaAccountRepository);
  return new DeleteAccountController(deleteAccount);
};
