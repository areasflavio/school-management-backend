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

  async execute({ email, password, role }: CreateAccountData): Promise<void> {
    const isEmailAlreadyRegistered = await this.accountRepository.getByEmail(
      email
    );
    if (isEmailAlreadyRegistered) {
      throw new Error('This email is already registered.');
    }
    const hashedPassword = await this.encrypter.encrypt(password);
    await this.accountRepository.create({
      email,
      password: hashedPassword,
      role,
    });
  }
}
