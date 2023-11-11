import { ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpResponse } from '@core/helpers/http';
import { GetAccounts } from '@domain/use-cases/account';

export class GetAccountsController implements Controller {
  constructor(private readonly getAccounts: GetAccounts) {}

  async handle(): Promise<HttpResponse> {
    try {
      const accounts = await this.getAccounts.execute();
      return ok(accounts);
    } catch (err) {
      return serverError();
    }
  }
}
