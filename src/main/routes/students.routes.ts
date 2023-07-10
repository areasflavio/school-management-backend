import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import { MulterUploadFileAdapter } from '@main/adapter/multer-uploadFile';
import {
  makeCreateStudentController,
  makeDeleteStudentController,
  makeGetStudentByIdController,
  makeGetStudentsController,
  makeUpdateStudentController,
} from '@main/factories/student';
import { fileImage, is } from '@main/middlewares';

const multer = new MulterUploadFileAdapter();

export default (router: Router): void => {
  router.post(
    '/alunos',
    is(['ADMIN']),
    multer.single('file'),
    fileImage(),
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
    multer.single('file'),
    fileImage(),
    expressAdapterRoute(makeUpdateStudentController())
  );
  router.delete(
    '/alunos/:id',
    is(['ADMIN']),
    expressAdapterRoute(makeDeleteStudentController())
  );
};
