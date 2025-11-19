import { DashboardService } from '../services/dashboard.services';
export class DashboardController {
    dashboardService = new DashboardService();
    async getDashboardStats(req, res) {
        try {
            const userId = req.user.userId;
            const { teamId } = req.params;
            const teamIdFromQuery = req.query.teamId;
            const stats = await this.dashboardService.getDashboardStats(userId, teamId || teamIdFromQuery);
            res.json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get dashboard stats'
            });
        }
    }
}
//# sourceMappingURL=dashboard.controller.js.map