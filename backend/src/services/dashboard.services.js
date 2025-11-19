import { ProjectRepository } from '../repositories/project.repository';
import { TaskRepository } from '../repositories/task.repository';
import { TeamRepository } from '../repositories/team.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import { TaskService } from './task.services';
export class DashboardService {
    projectRepository = new ProjectRepository();
    taskRepository = new TaskRepository();
    teamRepository = new TeamRepository();
    activityRepository = new ActivityRepository();
    taskService = new TaskService();
    async getDashboardStats(userId, teamId) {
        try {
            let teams = await this.teamRepository.findByUserId(userId);
            if (teamId) {
                teams = teams.filter(team => team.id === teamId);
            }
            const teamIds = teams.map(team => team.id);
            // Get projects for these teams
            const projects = await Promise.all(teamIds.map(teamId => this.projectRepository.findByTeamId(teamId)));
            const allProjects = projects.flat();
            // Get tasks for these projects
            const tasks = await Promise.all(allProjects.map(project => this.taskRepository.findByProjectId(project.id)));
            const allTasks = tasks.flat();
            // Get team member summaries
            const teamSummaries = await Promise.all(teams.map(team => this.taskService.getTeamMemberSummary(team.id)));
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
        catch (error) {
            console.error('Error in DashboardService.getDashboardStats:', error);
            throw new Error('Failed to load dashboard statistics');
        }
    }
}
//# sourceMappingURL=dashboard.services.js.map