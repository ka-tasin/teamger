
import { ProjectRepository } from '../repositories/project.repository';
import { TaskRepository } from '../repositories/task.repository';
import { TeamRepository } from '../repositories/team.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import { TaskService } from './task.services';
import type { IDashboardStats } from '../interfaces';

export class DashboardService {
  private projectRepository = new ProjectRepository();
  private taskRepository = new TaskRepository();
  private teamRepository = new TeamRepository();
  private activityRepository = new ActivityRepository();
  private taskService = new TaskService();

  async getDashboardStats(userId: string, teamId?: string): Promise<IDashboardStats> {
    let teams = await this.teamRepository.findByUserId(userId);
    
    if (teamId) {
      teams = teams.filter(team => team.id === teamId);
    }

    const teamIds = teams.map(team => team.id);

    // Get projects for these teams
    const projects = await Promise.all(
      teamIds.map(teamId => this.projectRepository.findByTeamId(teamId))
    );
    const allProjects = projects.flat();

    // Get tasks for these projects
    const tasks = await Promise.all(
      allProjects.map(project => this.taskRepository.findByProjectId(project.id))
    );
    const allTasks = tasks.flat();

    // Get team member summaries
    const teamSummaries = await Promise.all(
      teams.map(team => this.taskService.getTeamMemberSummary(team.id))
    );
    const allTeamSummaries = teamSummaries.flat();

    // Get recent activities
    const recentActivities = await this.activityRepository.findByUserId(userId, 10);

    return {
      totalProjects: allProjects.length,
      totalTasks: allTasks.length,
      teamSummary: allTeamSummaries,
      recentActivities: recentActivities
    };
  }
}