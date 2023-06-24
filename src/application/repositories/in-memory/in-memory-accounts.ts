import {
  AccountRepository,
  CreateAccountData,
  UpdateAccountData,
} from '@application/repositories/account';
import { Account } from '@domain/entities/account';

export class InMemoryAccountRepository implements AccountRepository {
  public accounts: Account[] = [];

  async create(account: CreateAccountData, id?: string): Promise<void> {
    this.accounts.push(
      Account.create(
        {
          ...account,
        },
        id
      )
    );
  }

  async get(): Promise<Account[]> {
    return this.accounts;
  }

  async getById(id: string): Promise<Account | null> {
    return this.accounts.find((account) => account.id === id) ?? null;
  }

  async getByEmail(email: string): Promise<Account | null> {
    return (
      this.accounts.find((account) => account.props.email === email) ?? null
    );
  }

  async update(id: string, data: UpdateAccountData): Promise<void> {
    this.accounts.forEach((account) => {
      if (account.id === id) {
        account.props = {
          ...account.props,
          ...data,
        };
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
