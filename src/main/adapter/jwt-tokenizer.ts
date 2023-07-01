import jwt from 'jsonwebtoken';

import { Tokenizer } from '@core/helpers/tokenizer';

type VerifyResponsePayload = {
  value?: string;
} & jwt.JwtPayload;

export class JWTTokenizerAdapter implements Tokenizer {
  constructor(
    private readonly secret: string,
    private readonly expirationTime: number
  ) {}

  sign(value: string): Promise<string> {
    return Promise.resolve(
      jwt.sign({ value }, this.secret, {
        expiresIn: this.expirationTime,
      })
    );
  }

  verify(token: string): Promise<string | undefined> {
    const payload = jwt.verify(token, this.secret) as VerifyResponsePayload;
    return Promise.resolve(payload.value);
  }
}
