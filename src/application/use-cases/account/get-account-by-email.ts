import { AccountRepository } from '@application/repositories/account';
import { Account } from '@domain/entities/account';
import { GetAccountByEmail } from '@domain/use-cases/account';

export class DbGetAccountByEmail implements GetAccountByEmail {
  constructor(private accountRepository: AccountRepository) {}

  async execute(email: string): Promise<Account | null> {
    const account = await this.accountRepository.getByEmail(email);
    return account;
  }
}
