import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeCreateEmployeeController,
  makeDeleteEmployeeController,
  makeGetEmployeeByIdController,
  makeGetEmployeesController,
  makeUpdateEmployeeController,
} from '@main/factories/employee';
import { is } from '@main/middlewares';

export default (router: Router): void => {
  router.post(
    '/funcionarios',
    is(['ADMIN']),
    expressAdapterRoute(makeCreateEmployeeController())
  );
  router.get(
    '/funcionarios',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetEmployeesController())
  );
  router.get(
    '/funcionarios/:id',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetEmployeeByIdController())
  );
  router.put(
    '/funcionarios/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeUpdateEmployeeController())
  );
  router.delete(
    '/funcionarios/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeDeleteEmployeeController())
  );
};
