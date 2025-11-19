import type { ICreateTask, ITask, IUpdateTask, IReassignmentResult, ITeamMemberSummary } from '../interfaces';
export declare class TaskService {
    private taskRepository;
    private teamMemberRepository;
    private activityRepository;
    private projectRepository;
    createTask(taskData: ICreateTask, userId: string): Promise<ITask>;
    updateTask(id: string, taskData: IUpdateTask, userId: string): Promise<ITask>;
    reassignTasks(teamId: string, userId: string): Promise<IReassignmentResult>;
    getTeamMemberSummary(teamId: string): Promise<ITeamMemberSummary[]>;
    getTasks(filters: {
        projectId?: string;
        assignedTo?: string;
        status?: string;
        priority?: string;
    }): Promise<ITask[]>;
    deleteTask(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=task.services.d.ts.map