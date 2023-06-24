import { Account, IAccount } from '@domain/entities/account';

export interface CreateAccount {
  execute: (account: IAccount) => Promise<void>;
}

export interface GetAccounts {
  execute: () => Promise<Account[]>;
}

export interface GetAccountById {
  execute: (id: string) => Promise<Account | null>;
}

export interface GetAccountByEmail {
  execute: (email: string) => Promise<Account | null>;
}

export interface UpdateAccount {
  execute: (
    id: string,
    data: Partial<Pick<IAccount, 'password'>>
  ) => Promise<void>;
}

export interface DeleteAccount {
  execute: (id: string) => Promise<void>;
}
