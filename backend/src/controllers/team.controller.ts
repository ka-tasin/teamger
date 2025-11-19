import type { Request, Response } from 'express';
import { TeamService } from '../services/team.service';

export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  createTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.createTeam(req.body, req.user.userId);
      res.status(201).json(team);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getTeams = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getTeamsByOwner(req.user.userId);
      res.status(200).json(teams);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getTeamById = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.getTeamById(req.params.id);
      res.status(200).json(team);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  updateTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.updateTeam(req.params.id, req.body);
      res.status(200).json(team);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteTeam = async (req: Request, res: Response) => {
    try {
      await this.teamService.deleteTeam(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  addTeamMember = async (req: Request, res: Response) => {
    try {
      const member = await this.teamService.addTeamMember(req.body);
      res.status(201).json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getTeamMembers = async (req: Request, res: Response) => {
    try {
      const members = await this.teamService.getTeamMembers(req.params.teamId);
      res.status(200).json(members);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  updateTeamMember = async (req: Request, res: Response) => {
    try {
      const member = await this.teamService.updateTeamMember(req.params.id, req.body);
      res.status(200).json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteTeamMember = async (req: Request, res: Response) => {
    try {
      await this.teamService.deleteTeamMember(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getMemberWorkload = async (req: Request, res: Response) => {
    try {
      const workload = await this.teamService.getMemberWorkload(req.params.id);
      res.status(200).json(workload);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}