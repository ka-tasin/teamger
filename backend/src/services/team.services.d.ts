import type { ITeam, ICreateTeam, ICreateTeamMember, ITeamMember } from '../interfaces';
export declare class TeamService {
    private teamRepository;
    private teamMemberRepository;
    private projectRepository;
    private activityRepository;
    createTeam(teamData: ICreateTeam, userId: string): Promise<ITeam>;
    addTeamMember(memberData: ICreateTeamMember, userId: string): Promise<ITeamMember>;
    getUserTeams(userId: string): Promise<ITeam[]>;
    getTeamWithDetails(teamId: string): Promise<ITeam | null>;
}
//# sourceMappingURL=team.services.d.ts.map