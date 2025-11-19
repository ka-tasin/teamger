import type { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.createTask(req.body, req.user.userId);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getTasksByProject = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getTasksByProject(req.params.projectId);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getTasksByMember = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getTasksByMember(req.params.memberId);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body, req.user.userId);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  autoAssignTask = async (req: Request, res: Response) => {
    try {
      const member = await this.taskService.autoAssignTask(req.body.projectId, req.user.userId);
      res.status(200).json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  reassignTasks = async (req: Request, res: Response) => {
    try {
      const result = await this.taskService.reassignTasks(req.user.userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const stats = await this.taskService.getDashboardStats(req.user.userId);
      res.status(200).json(stats);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}