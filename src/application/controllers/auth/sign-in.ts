import { InvalidParamError, MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { EmailValidator } from '@core/helpers/email-validator';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { Authenticate } from '@domain/use-cases/auth';

export class SignInController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly auth: Authenticate
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;
      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }
      const accessToken = await this.auth.execute({ email, password });
      return ok({ accessToken });
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
