import { BaseRepository } from './BaseRepository';
import type { IUser, ICreateUser } from '../interfaces';
export declare class UserRepository extends BaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    create(userData: ICreateUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
}
//# sourceMappingURL=user.repository.d.ts.map