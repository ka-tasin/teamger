import { BaseRepository } from './BaseRepository';
export class TeamRepository extends BaseRepository {
    async create(teamData) {
        try {
            return await this.prisma.team.create({
                data: teamData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findById(id) {
        try {
            return await this.prisma.team.findUnique({
                where: { id },
                include: {
                    members: true,
                    projects: true
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findById');
        }
    }
    async findByUserId(userId) {
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
        }
        catch (error) {
            return this.handleError(error, 'findByUserId');
        }
    }
    async update(id, data) {
        try {
            return await this.prisma.team.update({
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
            await this.prisma.team.delete({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'delete');
        }
    }
}
//# sourceMappingURL=team.repository.js.map