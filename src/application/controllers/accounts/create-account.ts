import { InvalidParamError, MissingParamError } from '@application/errors';
import {
  badRequest,
  created,
  serverError,
} from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { EmailValidator } from '@core/helpers/email-validator';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { CreateAccount } from '@domain/use-cases/account';

export class CreateAccountController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly createAccount: CreateAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }
      await this.createAccount.execute({ email, password });
      return created();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
