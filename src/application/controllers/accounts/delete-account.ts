import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { DeleteAccount } from '@domain/use-cases/account';

export class DeleteAccountController implements Controller {
  constructor(private readonly deleteAccount: DeleteAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.deleteAccount.execute(id);
      return ok();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
