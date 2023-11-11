import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { GetAccountById } from '@domain/use-cases/account';

export class GetAccountByIdController implements Controller {
  constructor(private readonly getsGetAccountById: GetAccountById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      const account = await this.getsGetAccountById.execute(id);
      return ok(account);
    } catch (err) {
      return serverError();
    }
  }
}
