import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import { MulterUploadFileAdapter } from '@main/adapter/multer-uploadFile';
import {
  makeCreateEmployeeController,
  makeDeleteEmployeeController,
  makeGetEmployeeByEmailController,
  makeGetEmployeeByIdController,
  makeGetEmployeesController,
  makeUpdateEmployeeController,
} from '@main/factories/employee';
import { fileImage, is } from '@main/middlewares';

const multer = new MulterUploadFileAdapter();

export default (router: Router): void => {
  router.post(
    '/funcionarios',
    is(['ADMIN']),
    multer.single('file'),
    fileImage(),
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
  router.get(
    '/funcionarios/email/:email',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetEmployeeByEmailController())
  );
  router.put(
    '/funcionarios/:id',
    is(['ADMIN']),
    multer.single('file'),
    fileImage(),
    expressAdapterRoute(makeUpdateEmployeeController())
  );
  router.delete(
    '/funcionarios/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeDeleteEmployeeController())
  );
};
