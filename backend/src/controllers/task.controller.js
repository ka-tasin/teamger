import { TaskService } from '../services/task.services';
export class TaskController {
    taskService = new TaskService();
    async createTask(req, res) {
        try {
            const taskData = req.body;
            const userId = req.user.userId;
            const task = await this.taskService.createTask(taskData, userId);
            res.status(201).json({
                success: true,
                data: task
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create task'
            });
        }
    }
    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const taskData = req.body;
            const userId = req.user.userId;
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Task ID is required'
                });
                return;
            }
            const task = await this.taskService.updateTask(id, taskData, userId);
            res.json({
                success: true,
                data: task
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update task'
            });
        }
    }
    async getTasks(req, res) {
        try {
            const filters = req.query;
            const tasks = await this.taskService.getTasks(filters);
            res.json({
                success: true,
                data: tasks
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get tasks'
            });
        }
    }
    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Task ID is required'
                });
                return;
            }
            await this.taskService.deleteTask(id, userId);
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to delete task'
            });
        }
    }
    async reassignTasks(req, res) {
        try {
            const { teamId } = req.params;
            const userId = req.user.userId;
            if (!teamId) {
                res.status(400).json({
                    success: false,
                    error: 'Task ID is required'
                });
                return;
            }
            const result = await this.taskService.reassignTasks(teamId, userId);
            res.json({
                success: true,
                data: result
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to reassign tasks'
            });
        }
    }
    async getTeamMemberSummary(req, res) {
        try {
            const { teamId } = req.params;
            if (!teamId) {
                res.status(400).json({
                    success: false,
                    error: 'Task ID is required'
                });
                return;
            }
            const summary = await this.taskService.getTeamMemberSummary(teamId);
            res.json({
                success: true,
                data: summary
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get team summary'
            });
        }
    }
}
//# sourceMappingURL=task.controller.js.map