import { BaseRepository } from './BaseRepository';
export class UserRepository extends BaseRepository {
    async findByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email }
            });
        }
        catch (error) {
            return this.handleError(error, 'findByEmail');
        }
    }
    async create(userData) {
        try {
            return await this.prisma.user.create({
                data: userData
            });
        }
        catch (error) {
            return this.handleError(error, 'create');
        }
    }
    async findById(id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'findById');
        }
    }
}
//# sourceMappingURL=user.repository.js.map