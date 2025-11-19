import type { Request, Response } from 'express';
export declare class TaskController {
    private taskService;
    createTask(req: Request, res: Response): Promise<void>;
    updateTask(req: Request, res: Response): Promise<void>;
    getTasks(req: Request, res: Response): Promise<void>;
    deleteTask(req: Request, res: Response): Promise<void>;
    reassignTasks(req: Request, res: Response): Promise<void>;
    getTeamMemberSummary(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=task.controller.d.ts.map