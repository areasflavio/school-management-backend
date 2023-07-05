import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeCreateStudentController,
  makeDeleteStudentController,
  makeGetStudentByIdController,
  makeGetStudentsController,
  makeUpdateStudentController,
} from '@main/factories/student';
import { is } from '@main/middlewares';

export default (router: Router): void => {
  router.post(
    '/alunos',
    is(['ADMIN']),
    expressAdapterRoute(makeCreateStudentController())
  );
  router.get(
    '/alunos',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetStudentsController())
  );
  router.get(
    '/alunos/:id',
    is(['ADMIN', 'USER']),
    expressAdapterRoute(makeGetStudentByIdController())
  );
  router.put(
    '/alunos/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeUpdateStudentController())
  );
  router.delete(
    '/alunos/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeDeleteStudentController())
  );
};
