import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { UpdateAccount } from '@domain/use-cases/account';

export class UpdateAccountController implements Controller {
  constructor(private readonly updateAccount: UpdateAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const avatar = httpRequest.base64File ?? null;
      const data = {
        ...httpRequest.body,
        avatar,
      };
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.updateAccount.execute(id, data);
      return ok();
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
