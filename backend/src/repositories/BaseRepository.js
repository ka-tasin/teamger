import prisma from '../../prisma';
import { PrismaClient } from '../../prisma/generated/prisma';
export class BaseRepository {
    prisma;
    constructor() {
        this.prisma = prisma;
    }
    handleError(error, method) {
        console.error(`Repository error in ${method}:`, error);
        if (error instanceof Error) {
            throw new Error(`Database error in ${method}: ${error.message}`);
        }
        throw new Error(`Unknown database error in ${method}`);
    }
}
//# sourceMappingURL=BaseRepository.js.map