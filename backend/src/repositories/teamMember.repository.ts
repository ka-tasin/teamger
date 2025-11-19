
import { BaseRepository } from './BaseRepository';
import type { ITeamMember, ICreateTeamMember } from '../interfaces/index';

export class TeamMemberRepository extends BaseRepository<ITeamMember> {
  async create(memberData: ICreateTeamMember): Promise<ITeamMember> {
    try {
      return await this.prisma.teamMember.create({
        data: memberData
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findByTeamId(teamId: string): Promise<ITeamMember[]> {
    try {
      return await this.prisma.teamMember.findMany({
        where: { teamId },
        include: {
          tasks: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByTeamId');
    }
  }

  async findById(id: string): Promise<ITeamMember | null> {
    try {
      return await this.prisma.teamMember.findUnique({
        where: { id },
        include: {
          tasks: true,
          team: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }

  async update(id: string, data: Partial<ITeamMember>): Promise<ITeamMember> {
    try {
      return await this.prisma.teamMember.update({
        where: { id },
        data
      });
    } catch (error) {
      return this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.teamMember.delete({
        where: { id }
      });
    } catch (error) {
      return this.handleError(error, 'delete');
    }
  }
}