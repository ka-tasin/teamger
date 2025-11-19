import { BaseRepository } from './BaseRepository';
import type { ITeamMember, ICreateTeamMember } from '../interfaces';
export declare class TeamMemberRepository extends BaseRepository<ITeamMember> {
    create(memberData: ICreateTeamMember): Promise<ITeamMember>;
    findByTeamId(teamId: string): Promise<ITeamMember[]>;
    findById(id: string): Promise<ITeamMember | null>;
    update(id: string, data: Partial<ITeamMember>): Promise<ITeamMember>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=teamMember.repository.d.ts.map