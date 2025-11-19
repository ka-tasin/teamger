
import { BaseRepository } from './BaseRepository';
import type { ITeam, ICreateTeam } from '../interfaces';

export class TeamRepository extends BaseRepository<ITeam> {
  async create(teamData: ICreateTeam): Promise<ITeam> {
    try {
      return await this.prisma.team.create({ 
        data: teamData 
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findById(id: string): Promise<ITeam | null> {
    try {
      return await this.prisma.team.findUnique({ 
        where: { id },
        include: {
          members: true,
          projects: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }

  async findByUserId(userId: string): Promise<ITeam[]> {
    try {
      return await this.prisma.team.findMany({
        where: {
          members: {
            some: {
              userId
            }
          }
        },
        include: {
          members: true,
          projects: {
            include: {
              tasks: true
            }
          }
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByUserId');
    }
  }

  async update(id: string, data: Partial<ITeam>): Promise<ITeam> {
    try {
      return await this.prisma.team.update({
        where: { id },
        data
      });
    } catch (error) {
      return this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.team.delete({
        where: { id }
      });
    } catch (error) {
      return this.handleError(error, 'delete');
    }
  }
}