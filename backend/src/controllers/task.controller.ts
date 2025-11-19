import type { Request, Response } from 'express';
import { TaskService } from '../services/task.services';
import type { ICreateTask, IUpdateTask } from '../interfaces/index';

export class TaskController {
  private taskService = new TaskService();

  async createTask(req: Request, res: Response) {
    try {
      const taskData: ICreateTask = req.body;
      const userId = (req as any).user.userId;

      const task = await this.taskService.createTask(taskData, userId);

      res.status(201).json({
        success: true,
        data: task
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create task'
      });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskData: IUpdateTask = req.body;
      const userId = (req as any).user.userId;


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
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update task'
      });
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const filters = req.query;
      const tasks = await this.taskService.getTasks(filters);

      res.json({
        success: true,
        data: tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get tasks'
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;


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
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete task'
      });
    }
  }

  async reassignTasks(req: Request, res: Response) {
    try {
      const { teamId } = req.params;
      const userId = (req as any).user.userId;


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
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to reassign tasks'
      });
    }
  }

  async getTeamMemberSummary(req: Request, res: Response) {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get team summary'
      });
    }
  }
}