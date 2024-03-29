import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeSignInController,
  makeSignUpController,
} from '@main/factories/auth';

export default (router: Router): void => {
  router.post('/sign-up', expressAdapterRoute(makeSignUpController()));
  router.post('/sign-in', expressAdapterRoute(makeSignInController()));
};
