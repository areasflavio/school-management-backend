import { Account, IAccount } from '@domain/entities/account';

export type CreateAccountData = IAccount;

export type UpdateAccountData = Partial<Pick<IAccount, 'password' | 'role'>>;

export interface AccountRepository {
  create(data: CreateAccountData): Promise<void>;
  get(): Promise<Account[]>;
  getById(id: string): Promise<Account | null>;
  getByEmail(email: string): Promise<Account | null>;
  update(id: string, data: UpdateAccountData): Promise<void>;
  delete(id: string): Promise<void>;
}
