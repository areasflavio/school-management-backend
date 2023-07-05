import { RoleMiddleware } from '@application/middlewares/role';
import { PrismaAccountRepository } from '@application/repositories/prisma/account';
import { JWTTokenizerAdapter } from '@main/adapter/jwt-tokenizer';
import env from '@main/config/env';

export const makeIs = (userRoles: string[]) => {
  const tokenizer = new JWTTokenizerAdapter(env.secret, 1000 * 60 * 60 * 24);
  const prismaAccountRepository = new PrismaAccountRepository();
  return new RoleMiddleware(userRoles, tokenizer, prismaAccountRepository);
};
