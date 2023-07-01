import { AccessDeniedError } from '@application/errors';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '@application/helpers/http-helper';
import { Middleware } from '@core/application/middleware';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { Tokenizer } from '@core/helpers/tokenizer';

export class AuthMiddleware implements Middleware {
  constructor(private readonly tokenizer: Tokenizer) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const id = await this.tokenizer.verify(accessToken);
        if (id) {
          return ok();
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (err) {
      if (err instanceof Error) {
        return badRequest(err);
      }
      return serverError();
    }
  }
}
