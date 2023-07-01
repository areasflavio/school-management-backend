import { Router, type Express } from 'express';

import { ensureAuthenticated } from '@main/middlewares';
import { auth, employees, students } from '@main/routes';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use('/api', router);
  auth(router);
  router.use(ensureAuthenticated);
  students(router);
  employees(router);
};
