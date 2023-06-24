import {
  AccountRepository,
  UpdateAccountData,
} from '@application/repositories/account';
import { UpdateAccount } from '@domain/use-cases/account';

export class DbUpdateAccount implements UpdateAccount {
  constructor(private accountRepository: AccountRepository) {}

  async execute(id: string, data: UpdateAccountData): Promise<void> {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      throw new Error('Account not found');
    }
    this.accountRepository.update(id, data);
  }
}
