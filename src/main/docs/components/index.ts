import { bearerAuth } from './auth';
import { badRequest } from './bad-request';
import { forbidden } from './forbidden';
import { notFound } from './not-found';
import { serverError } from './server-error';
import { unauthorized } from './unauthorized';

export default {
  securitySchemes: {
    bearerAuth: bearerAuth,
  },
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
};
