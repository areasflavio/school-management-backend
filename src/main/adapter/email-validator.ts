import validator from 'validator';

import { EmailValidator } from '@core/helpers/email-validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
