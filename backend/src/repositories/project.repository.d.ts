import { BaseRepository } from './BaseRepository';
import type { IProject, ICreateProject } from '../interfaces';
export declare class ProjectRepository extends BaseRepository<IProject> {
    create(projectData: ICreateProject): Promise<IProject>;
    findByTeamId(teamId: string): Promise<IProject[]>;
    findByUserId(userId: string): Promise<IProject[]>;
    findById(id: string): Promise<IProject | null>;
    update(id: string, data: Partial<IProject>): Promise<IProject>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=project.repository.d.ts.map