import { AccountRepository } from '@application/repositories/account';
import { Account } from '@domain/entities/account';
import { GetAccountById } from '@domain/use-cases/account';

export class DbGetAccountById implements GetAccountById {
  constructor(private accountRepository: AccountRepository) {}

  async execute(id: string): Promise<Account | null> {
    const account = await this.accountRepository.getById(id);
    return account;
  }
}
