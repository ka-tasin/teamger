import { PrismaClient } from '../../prisma/generated/prisma';
export declare abstract class BaseRepository<T> {
    protected prisma: PrismaClient;
    constructor();
    protected handleError(error: unknown, method: string): never;
}
//# sourceMappingURL=BaseRepository.d.ts.map