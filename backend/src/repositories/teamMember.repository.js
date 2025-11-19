import { BaseRepository } from './BaseRepository';
export class TeamMemberRepository extends BaseRepository {
    async create(memberData) {
        try {
            return await this.prisma.teamMember.create({
                data: memberData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findByTeamId(teamId) {
        try {
            return await this.prisma.teamMember.findMany({
                where: { teamId },
                include: {
                    tasks: true
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findByTeamId');
        }
    }
    async findById(id) {
        try {
            return await this.prisma.teamMember.findUnique({
                where: { id },
                include: {
                    tasks: true,
                    team: true
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findById');
        }
    }
    async update(id, data) {
        try {
            return await this.prisma.teamMember.update({
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
            await this.prisma.teamMember.delete({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'delete');
        }
    }
}
//# sourceMappingURL=teamMember.repository.js.map