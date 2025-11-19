import { BaseRepository } from './BaseRepository';
export class ProjectRepository extends BaseRepository {
    async create(projectData) {
        try {
            return await this.prisma.project.create({
                data: projectData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findByTeamId(teamId) {
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
        }
        catch (error) {
            return this.handleError(error, 'findByTeamId');
        }
    }
    async findByUserId(userId) {
        try {
            return await this.prisma.project.findMany({
                where: { userId },
                include: {
                    tasks: true,
                    team: true
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findByUserId');
        }
    }
    async findById(id) {
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
        }
        catch (error) {
            return this.handleError(error, 'findById');
        }
    }
    async update(id, data) {
        try {
            return await this.prisma.project.update({
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
            await this.prisma.project.delete({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'delete');
        }
    }
}
//# sourceMappingURL=project.repository.js.map