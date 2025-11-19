
import { BaseRepository } from './BaseRepository';
import type { IUser, ICreateUser } from '../interfaces';

export class UserRepository extends BaseRepository<IUser> {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({ 
        where: { email } 
      });
    } catch (error) {
      return this.handleError(error, 'findByEmail');
    }
  }

  async create(userData: ICreateUser): Promise<IUser> {
    try {
      return await this.prisma.user.create({ 
        data: userData 
      });
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({ 
        where: { id } 
      });
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }
}