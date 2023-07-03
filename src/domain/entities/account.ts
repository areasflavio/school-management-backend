import { Entity } from '@core/domain/entity';

export interface IAccount {
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

export class Account extends Entity<IAccount> {
  private constructor(props: IAccount, id?: string) {
    super(props, id);
  }

  static create(props: IAccount, id?: string) {
    const account = new Account(props, id);
    return account;
  }
}
