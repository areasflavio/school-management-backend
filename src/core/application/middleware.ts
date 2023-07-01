import { HttpRequest, HttpResponse } from '@core/helpers/http';

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
