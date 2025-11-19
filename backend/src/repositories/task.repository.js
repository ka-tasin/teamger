import { BaseRepository } from './BaseRepository';
export class TaskRepository extends BaseRepository {
    async create(taskData) {
        try {
            return await this.prisma.task.create({
                data: taskData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findByProjectId(projectId) {
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
        }
        catch (error) {
            return this.handleError(error, 'findByProjectId');
        }
    }
    async findByTeamId(teamId) {
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
        }
        catch (error) {
            return this.handleError(error, 'findByTeamId');
        }
    }
    async findByMemberId(memberId) {
        try {
            return await this.prisma.task.findMany({
                where: { assignedTo: memberId },
                include: {
                    project: true
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findByMemberId');
        }
    }
    async findById(id) {
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
        }
        catch (error) {
            return this.handleError(error, 'findById');
        }
    }
    async update(id, data) {
        try {
            return await this.prisma.task.update({
                where: { id },
                data
            });
        }
        catch (error) {
            return this.handleError(error, 'update');
        }
    }
    async delete(id) {
        try {
            await this.prisma.task.delete({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'delete');
        }
    }
    async getTasksWithFilters(filters) {
        try {
            const where = {};
            if (filters.projectId)
                where.projectId = filters.projectId;
            if (filters.assignedTo)
                where.assignedTo = filters.assignedTo;
            if (filters.status)
                where.status = filters.status;
            if (filters.priority)
                where.priority = filters.priority;
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
        }
        catch (error) {
            return this.handleError(error, 'getTasksWithFilters');
        }
    }
}
//# sourceMappingURL=task.repository.js.map