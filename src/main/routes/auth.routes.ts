import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import { makeSignUpController } from '@main/factories/auth';

export default (router: Router): void => {
  router.post('/sign-up', expressAdapterRoute(makeSignUpController()));
};
