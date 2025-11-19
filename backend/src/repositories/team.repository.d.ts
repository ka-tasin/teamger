import { BaseRepository } from './BaseRepository';
import type { ITeam, ICreateTeam } from '../interfaces';
export declare class TeamRepository extends BaseRepository<ITeam> {
    create(teamData: ICreateTeam): Promise<ITeam>;
    findById(id: string): Promise<ITeam | null>;
    findByUserId(userId: string): Promise<ITeam[]>;
    update(id: string, data: Partial<ITeam>): Promise<ITeam>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=team.repository.d.ts.map