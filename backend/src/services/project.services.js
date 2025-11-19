import { ProjectRepository } from '../repositories/project.repository';
import { TeamRepository } from '../repositories/team.repository';
import { ActivityRepository } from '../repositories/activity.repository';
export class ProjectService {
    projectRepository = new ProjectRepository();
    teamRepository = new TeamRepository();
    activityRepository = new ActivityRepository();
    async createProject(projectData, userId) {
        const team = await this.teamRepository.findById(projectData.teamId);
        if (!team) {
            throw new Error('Team not found');
        }
        // Check if user is a member of the team
        const isTeamMember = team.member.some(member => member.userId === userId);
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
    async getProjectsByOwner(userId) {
        return this.projectRepository.findByUserId(userId);
    }
    async getTeamProjects(teamId) {
        return this.projectRepository.findByTeamId(teamId);
    }
    async getProjectById(projectId) {
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }
    async updateProject(projectId, updateData, userId) {
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
    async deleteProject(projectId, userId) {
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
//# sourceMappingURL=project.services.js.map