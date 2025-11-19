import { ProjectRepository } from '../repositories/project.repository';
import { TeamRepository } from '../repositories/team.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import type { IProject, ICreateProject } from '../interfaces/index';

export class ProjectService {
  private projectRepository = new ProjectRepository();
  private teamRepository = new TeamRepository();
  private activityRepository = new ActivityRepository();

  async createProject(projectData: ICreateProject, userId: string): Promise<IProject> {
    const team = await this.teamRepository.findById(projectData.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    // Check if user is a member of the team
    const isTeamMember = team.members?.some(member => member.userId === userId);
    if (!isTeamMember) {
      throw new Error('You are not a member of this team');
    }

    const project = await this.projectRepository.create({
      ...projectData,
      userId
    });

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

  async getProjectsByOwner(userId: string): Promise<IProject[]> {
    return this.projectRepository.findByUserId(userId);
  }

  async getTeamProjects(teamId: string): Promise<IProject[]> {
    return this.projectRepository.findByTeamId(teamId);
  }

  async getProjectById(projectId: string): Promise<IProject> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async updateProject(projectId: string, updateData: Partial<IProject>, userId: string): Promise<IProject> {
    const existingProject = await this.projectRepository.findById(projectId);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    // Check if user owns the project
    if (existingProject.userId !== userId) {
      throw new Error('You can only update your own projects');
    }

    const project = await this.projectRepository.update(projectId, updateData);

    // Log activity
    await this.activityRepository.create({
      action: 'PROJECT_UPDATED',
      details: {
        projectId: project.id,
        projectName: project.name,
        updates: updateData
      },
      userId
    });

    return project;
  }

  async deleteProject(projectId: string, userId: string): Promise<void> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Check if user owns the project
    if (project.userId !== userId) {
      throw new Error('You can only delete your own projects');
    }

    await this.projectRepository.delete(projectId);

    // Log activity
    await this.activityRepository.create({
      action: 'PROJECT_DELETED',
      details: {
        projectId: project.id,
        projectName: project.name
      },
      userId
    });
  }
}