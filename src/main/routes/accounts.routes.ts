import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeCreateAccountController,
  makeDeleteAccountController,
  makeGetAccountByIdController,
  makeGetAccountsController,
  makeUpdateAccountController,
} from '@main/factories/account';
import { is } from '@main/middlewares';

export default (router: Router): void => {
  router.post(
    '/usuarios',
    is(['ADMIN']),
    expressAdapterRoute(makeCreateAccountController())
  );
  router.get(
    '/usuarios',
    is(['ADMIN']),
    expressAdapterRoute(makeGetAccountsController())
  );
  router.get(
    '/usuarios/:id',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetAccountByIdController())
  );
  router.put(
    '/usuarios/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeUpdateAccountController())
  );
  router.delete(
    '/usuarios/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeDeleteAccountController())
  );
};
