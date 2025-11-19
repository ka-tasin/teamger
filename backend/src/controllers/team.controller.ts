
import type { Request, Response } from 'express';
import { TeamService } from '../services/team.services';
import type { ICreateTeam, ICreateTeamMember } from '../interfaces/index';

export class TeamController {
  private teamService = new TeamService();

  async createTeam(req: Request, res: Response) {
    try {
      const teamData: ICreateTeam = req.body;
      const userId = (req as any).user.userId;

      const team = await this.teamService.createTeam(teamData, userId);

      res.status(201).json({
        success: true,
        data: team
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create team'
      });
    }
  }

  async addTeamMember(req: Request, res: Response) {
    try {
      const memberData: ICreateTeamMember = req.body;
      const userId = (req as any).user.userId;

      const member = await this.teamService.addTeamMember(memberData, userId);

      res.status(201).json({
        success: true,
        data: member
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add team member'
      });
    }
  }

  async getUserTeams(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const teams = await this.teamService.getUserTeams(userId);

      res.json({
        success: true,
        data: teams
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get teams'
      });
    }
  }

  async getTeamDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Task ID is required'
        });
        return;
      }
      const team = await this.teamService.getTeamWithDetails(id);

      if (!team) {
        return res.status(404).json({
          success: false,
          error: 'Team not found'
        });
      }

      res.json({
        success: true,
        data: team
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get team details'
      });
    }
  }
}