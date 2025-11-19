import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.services';

export class DashboardController {
  private dashboardService = new DashboardService();

  async getDashboardStats(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { teamId } = req.params; 
      const teamIdFromQuery = req.query.teamId as string; 
      
      const stats = await this.dashboardService.getDashboardStats(
        userId, 
        teamId || teamIdFromQuery
      );
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get dashboard stats'
      });
    }
  }
}