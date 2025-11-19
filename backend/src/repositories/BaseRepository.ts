import prisma from '../../prisma';
import { PrismaClient } from '../../prisma/generated/prisma';

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  protected handleError(error: unknown, method: string): never {
    console.error(`Repository error in ${method}:`, error);
    if (error instanceof Error) {
      throw new Error(`Database error in ${method}: ${error.message}`);
    }
    throw new Error(`Unknown database error in ${method}`);
  }
}