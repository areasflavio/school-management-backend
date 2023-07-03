import {
  AccountRepository,
  CreateAccountData,
  UpdateAccountData,
} from '@application/repositories/account';
import { Account } from '@domain/entities/account';
import { prismaAdapterAccount } from '@main/adapter/prisma-entity';
import prisma from '@main/config/prisma';

export class PrismaAccountRepository implements AccountRepository {
  async create(data: CreateAccountData): Promise<void> {
    const { email, password } = data;
    await prisma.account.create({
      data: {
        email,
        password,
      },
    });
  }

  async get(): Promise<Account[]> {
    const prismaAccounts = await prisma.account.findMany();
    const accounts = prismaAccounts.map(prismaAdapterAccount);
    return accounts;
  }

  async getById(id: string): Promise<Account | null> {
    const prismaAccount = await prisma.account.findUnique({
      where: { id },
    });
    if (!prismaAccount) {
      return null;
    }
    const account = prismaAdapterAccount(prismaAccount);
    return account;
  }

  async getByEmail(email: string): Promise<Account | null> {
    const prismaAccount = await prisma.account.findFirst({
      where: { email },
    });
    if (!prismaAccount) {
      return null;
    }
    const account = prismaAdapterAccount(prismaAccount);
    return account;
  }

  async update(id: string, data: UpdateAccountData): Promise<void> {
    const { password, role } = data;
    const account = await prisma.account.findUnique({
      where: { id },
    });
    if (!account) {
      return;
    }
    await prisma.account.update({
      where: { id },
      data: {
        password,
        role: role ?? account.role,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.account.delete({
      where: { id },
    });
  }
}
