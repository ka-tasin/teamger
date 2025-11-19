import type { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  createProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.createProject(req.body, req.user.userId);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectService.getProjectsByOwner(req.user.userId);
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  updateProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.updateProject(req.params.id, req.body);
      res.status(200).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProject = async (req: Request, res: Response) => {
    try {
      await this.projectService.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}