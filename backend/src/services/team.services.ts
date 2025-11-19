
import { TeamRepository } from '../repositories/team.repository';
import { TeamMemberRepository } from '../repositories/teamMember.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import type { ITeam, ICreateTeam, ICreateTeamMember, ITeamMember } from '../interfaces';

export class TeamService {
  private teamRepository = new TeamRepository();
  private teamMemberRepository = new TeamMemberRepository();
  private projectRepository = new ProjectRepository();
  private activityRepository = new ActivityRepository();

  async createTeam(teamData: ICreateTeam, userId: string): Promise<ITeam> {
    const team = await this.teamRepository.create(teamData);

    // Add the creator as a team member
    await this.teamMemberRepository.create({
      name: 'Team Lead', 
      role: 'Team Lead',
      capacity: 5,
      teamId: team.id,
      userId: userId
    });

    // Log activity
    await this.activityRepository.create({
      action: 'TEAM_CREATED',
      details: { 
        teamId: team.id, 
        teamName: team.name 
      },
      userId
    });

    return team;
  }

  async addTeamMember(memberData: ICreateTeamMember, userId: string): Promise<ITeamMember> {
    const team = await this.teamRepository.findById(memberData.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const member = await this.teamMemberRepository.create(memberData);

    // Log activity
    await this.activityRepository.create({
      action: 'TEAM_MEMBER_ADDED',
      details: { 
        teamId: memberData.teamId,
        teamName: team.name,
        memberName: memberData.name,
        memberRole: memberData.role
      },
      userId
    });

    return member;
  }

  async getUserTeams(userId: string): Promise<ITeam[]> {
    return this.teamRepository.findByUserId(userId);
  }

  async getTeamWithDetails(teamId: string): Promise<ITeam | null> {
    return this.teamRepository.findById(teamId);
  }
}