import type { IProject, ICreateProject } from '../interfaces';
export declare class ProjectService {
    private projectRepository;
    private teamRepository;
    private activityRepository;
    createProject(projectData: ICreateProject, userId: string): Promise<IProject>;
    getProjectsByOwner(userId: string): Promise<IProject[]>;
    getTeamProjects(teamId: string): Promise<IProject[]>;
    getProjectById(projectId: string): Promise<IProject>;
    updateProject(projectId: string, updateData: Partial<IProject>, userId: string): Promise<IProject>;
    deleteProject(projectId: string, userId: string): Promise<void>;
}
//# sourceMappingURL=project.services.d.ts.map