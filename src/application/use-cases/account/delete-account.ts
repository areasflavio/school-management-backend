import { AccountRepository } from '@application/repositories/account';
import { DeleteAccount } from '@domain/use-cases/account';

export class DbDeleteAccount implements DeleteAccount {
  constructor(private accountRepository: AccountRepository) {}

  async execute(id: string): Promise<void> {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      throw new Error('Account not found');
    }
    await this.accountRepository.delete(id);
  }
}
