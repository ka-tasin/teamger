
import { BaseRepository } from './BaseRepository';
import type { IActivityLog } from '../interfaces';

export class ActivityRepository extends BaseRepository<IActivityLog> {
  async create(activityData: Omit<IActivityLog, 'id' | 'createdAt'>): Promise<IActivityLog> {
    try {
      return await this.prisma.activityLog.create({ 
        data: activityData 
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findByUserId(userId: string, limit?: number): Promise<IActivityLog[]> {
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
    } catch (error) {
      return this.handleError(error, 'findByUserId');
    }
  }

  async findByTeamId(teamId: string, limit?: number): Promise<IActivityLog[]> {
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
    } catch (error) {
      return this.handleError(error, 'findByTeamId');
    }
  }
}