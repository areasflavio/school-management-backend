import { AccountRepository } from '@application/repositories/account';
import { Encrypter } from '@core/helpers/encrypter';
import { Tokenizer } from '@core/helpers/tokenizer';
import { Authenticate, AuthenticateData } from '@domain/use-cases/auth';

export class DbAuthenticate implements Authenticate {
  constructor(
    private readonly encrypter: Encrypter,
    private accountRepository: AccountRepository,
    private readonly tokenizer: Tokenizer
  ) {}

  async execute({ email, password }: AuthenticateData): Promise<string> {
    const account = await this.accountRepository.getByEmail(email);
    if (!account) {
      throw new Error('User not found.');
    }
    const passwordMatches = await this.encrypter.compare(
      password,
      account.props.password
    );
    if (!passwordMatches) {
      throw new Error('Authentication error.');
    }
    const token = this.tokenizer.sign(account.id);
    return token;
  }
}
