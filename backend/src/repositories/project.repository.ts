
import { BaseRepository } from './BaseRepository';
import type { IProject, ICreateProject } from '../interfaces';

export class ProjectRepository extends BaseRepository<IProject> {
  async create(projectData: ICreateProject): Promise<IProject> {
    try {
      return await this.prisma.project.create({ 
        data: projectData 
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findByTeamId(teamId: string): Promise<IProject[]> {
    try {
      return await this.prisma.project.findMany({
        where: { teamId },
        include: {
          tasks: {
            include: {
              member: true
            }
          },
          team: {
            include: {
              members: true
            }
          }
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByTeamId');
    }
  }

  async findByUserId(userId: string): Promise<IProject[]> {
    try {
      return await this.prisma.project.findMany({
        where: { userId },
        include: {
          tasks: true,
          team: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByUserId');
    }
  }

  async findById(id: string): Promise<IProject | null> {
    try {
      return await this.prisma.project.findUnique({
        where: { id },
        include: {
          tasks: {
            include: {
              member: true
            }
          },
          team: {
            include: {
              members: true
            }
          }
        }
      });
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject> {
    try {
      return await this.prisma.project.update({
        where: { id },
        data
      });
    } catch (error) {
      return this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.project.delete({
        where: { id }
      });
    } catch (error) {
      return this.handleError(error, 'delete');
    }
  }
}