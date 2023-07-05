import { makeEnsureAuthenticate } from '@main/factories/auth';
import { type NextFunction, type Request, type Response } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req?.headers || !req.headers?.authorization) {
    res.statusCode = 403;
    res.json({
      error: 'Access Denied: Missing JWT token from the "Authorization" header',
    });
    return;
  }

  const [, token] = req.headers.authorization.split(' ');

  req.accessToken = token;

  makeEnsureAuthenticate().handle(req);

  next();
};
