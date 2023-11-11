import { UnauthorizedError } from '@application/errors';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@application/helpers/http-helper';
import { AccountRepository } from '@application/repositories/account';
import { Middleware } from '@core/application/middleware';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { Tokenizer } from '@core/helpers/tokenizer';

export class RoleMiddleware implements Middleware {
  constructor(
    private readonly roles: string[],
    private readonly tokenizer: Tokenizer,
    private readonly accountRepository: AccountRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      const id = await this.tokenizer.verify(accessToken!);
      if (id) {
        const account = await this.accountRepository.getById(id);
        if (account?.id) {
          const { role } = account.props;
          if (this.roles.includes(role!)) return ok();
        }
      }
      return unauthorized(new UnauthorizedError());
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
