import { AccountRepository } from '@application/repositories/account';
import { Account } from '@domain/entities/account';
import { GetAccounts } from '@domain/use-cases/account';

export class DbGetAccounts implements GetAccounts {
  constructor(private accountRepository: AccountRepository) {}

  async execute(): Promise<Account[]> {
    const accounts = await this.accountRepository.get();
    return accounts;
  }
}
