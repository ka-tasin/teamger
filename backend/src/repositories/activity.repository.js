import { BaseRepository } from './BaseRepository';
export class ActivityRepository extends BaseRepository {
    async create(activityData) {
        try {
            return await this.prisma.activityLog.create({
                data: activityData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findByUserId(userId, limit) {
        try {
            return await this.prisma.activityLog.findMany({
                where: { userId },
                include: {
                    task: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: limit || 10
            });
        }
        catch (error) {
            return this.handleError(error, 'findByUserId');
        }
    }
    async findByTeamId(teamId, limit) {
        try {
            return await this.prisma.activityLog.findMany({
                where: {
                    task: {
                        project: {
                            teamId
                        }
                    }
                },
                include: {
                    task: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: limit || 10
            });
        }
        catch (error) {
            return this.handleError(error, 'findByTeamId');
        }
    }
}
//# sourceMappingURL=activity.repository.js.map