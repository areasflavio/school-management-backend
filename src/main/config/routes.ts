import { auth, employees, students } from '@main/routes';
import { Router, type Express } from 'express';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use('/api', router);
  students(router);
  employees(router);
  auth(router);
};
