import { ServerError } from '@application/errors';
import { type HttpResponse } from '@core/helpers/http';

export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data?: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
