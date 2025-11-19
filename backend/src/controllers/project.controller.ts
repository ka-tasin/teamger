
import type { Request, Response } from 'express';
import { ProjectService } from '../services/project.services'; 

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  createProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.createProject(
        req.body, 
        (req as any).user.userId
      );
      res.status(201).json({ success: true, data: project });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectService.getProjectsByOwner(
        (req as any).user.userId
      );
      res.status(200).json({ success: true, data: projects });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getTeamProjects = async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      if (!teamId) {
        return res.status(400).json({ success: false, error: 'teamId parameter is required' });
      }
      const projects = await this.projectService.getTeamProjects(teamId);
      res.status(200).json({ success: true, data: projects });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      
       if (!req.params.id) {
        return res.status(400).json({ success: false, error: 'id parameter is required' });
      }
      const project = await this.projectService.getProjectById(req.params.id);
      res.status(200).json({ success: true, data: project });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  };

  getProjectDetails = async (req: Request, res: Response) => {
    try {
 
       if (!req.params.id) {
        return res.status(400).json({ success: false, error: 'id parameter is required' });
      }
        const project = await this.projectService.getProjectById(req.params.id);
      res.status(200).json({ success: true, data: project });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  };

  updateProject = async (req: Request, res: Response) => {
    try {
       if (!req.params.id) {
        return res.status(400).json({ success: false, error: 'id parameter is required' });
      }
      const project = await this.projectService.updateProject(
        req.params.id, 
        req.body, 
        (req as any).user.userId
      );
      res.status(200).json({ success: true, data: project });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  deleteProject = async (req: Request, res: Response) => {
    try {
       if (!req.params.id) {
        return res.status(400).json({ success: false, error: 'id parameter is required' });
      }
      await this.projectService.deleteProject(
        req.params.id, 
        (req as any).user.userId
      );
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}