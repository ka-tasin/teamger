import { BaseRepository } from './BaseRepository';
import type { ITask, ICreateTask, IUpdateTask } from '../interfaces';
export declare class TaskRepository extends BaseRepository<ITask> {
    create(taskData: ICreateTask): Promise<ITask>;
    findByProjectId(projectId: string): Promise<ITask[]>;
    findByTeamId(teamId: string): Promise<ITask[]>;
    findByMemberId(memberId: string): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    update(id: string, data: IUpdateTask): Promise<ITask>;
    delete(id: string): Promise<void>;
    getTasksWithFilters(filters: {
        projectId?: string;
        assignedTo?: string;
        status?: string;
        priority?: string;
    }): Promise<ITask[]>;
}
//# sourceMappingURL=task.repository.d.ts.map