import {
  AccountRepository,
  CreateAccountData,
} from '@application/repositories/account';
import { Encrypter } from '@core/helpers/encrypter';
import { CreateAccount } from '@domain/use-cases/account';

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private accountRepository: AccountRepository
  ) {}

  async execute({ email, password }: CreateAccountData): Promise<void> {
    const hashedPassword = await this.encrypter.encrypt(password);
    await this.accountRepository.create({
      email,
      password: hashedPassword,
    });
  }
}
