
import { BaseRepository } from './BaseRepository';
import type { ITask, ICreateTask, IUpdateTask } from '../interfaces';

export class TaskRepository extends BaseRepository<ITask> {
  async create(taskData: ICreateTask): Promise<ITask> {
    try {
      return await this.prisma.task.create({ 
        data: taskData 
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findByProjectId(projectId: string): Promise<ITask[]> {
    try {
      return await this.prisma.task.findMany({
        where: { projectId },
        include: {
          member: true,
          project: {
            include: {
              team: true
            }
          }
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByProjectId');
    }
  }

  async findByTeamId(teamId: string): Promise<ITask[]> {
    try {
      return await this.prisma.task.findMany({
        where: {
          project: {
            teamId
          }
        },
        include: {
          member: true,
          project: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByTeamId');
    }
  }

  async findByMemberId(memberId: string): Promise<ITask[]> {
    try {
      return await this.prisma.task.findMany({
        where: { assignedTo: memberId },
        include: {
          project: true
        }
      });
    } catch (error) {
      return this.handleError(error, 'findByMemberId');
    }
  }

  async findById(id: string): Promise<ITask | null> {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
        include: {
          member: true,
          project: {
            include: {
              team: true
            }
          }
        }
      });
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }

  async update(id: string, data: IUpdateTask): Promise<ITask> {
    try {
      return await this.prisma.task.update({
        where: { id },
        data
      });
    } catch (error) {
      return this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: { id }
      });
    } catch (error) {
      return this.handleError(error, 'delete');
    }
  }

  async getTasksWithFilters(filters: {
    projectId?: string;
    assignedTo?: string;
    status?: string;
    priority?: string;
  }): Promise<ITask[]> {
    try {
      const where: any = {};
      
      if (filters.projectId) where.projectId = filters.projectId;
      if (filters.assignedTo) where.assignedTo = filters.assignedTo;
      if (filters.status) where.status = filters.status;
      if (filters.priority) where.priority = filters.priority;

      return await this.prisma.task.findMany({
        where,
        include: {
          member: true,
          project: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      return this.handleError(error, 'getTasksWithFilters');
    }
  }
}