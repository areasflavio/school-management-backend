import bcrypt from 'bcrypt';

import { Encrypter } from '@core/helpers/encrypter';

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
