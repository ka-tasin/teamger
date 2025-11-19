
import { ProjectRepository } from '../repositories/project.repository';
import { TeamRepository } from '../repositories/team.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import type { IProject, ICreateProject } from '../interfaces';

export class ProjectService {
  private projectRepository = new ProjectRepository();
  private teamRepository = new TeamRepository();
  private activityRepository = new ActivityRepository();

  async createProject(projectData: ICreateProject, userId: string): Promise<IProject> {
    const team = await this.teamRepository.findById(projectData.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const project = await this.projectRepository.create(projectData);

    // Log activity
    await this.activityRepository.create({
      action: 'PROJECT_CREATED',
      details: { 
        projectId: project.id, 
        projectName: project.name,
        teamId: project.teamId
      },
      userId
    });

    return project;
  }

  async getUserProjects(userId: string): Promise<IProject[]> {
    return this.projectRepository.findByUserId(userId);
  }

  async getTeamProjects(teamId: string): Promise<IProject[]> {
    return this.projectRepository.findByTeamId(teamId);
  }

  async getProjectWithDetails(projectId: string): Promise<IProject | null> {
    return this.projectRepository.findById(projectId);
  }
}