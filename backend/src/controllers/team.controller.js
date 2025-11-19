import { TeamService } from '../services/team.services';
export class TeamController {
    teamService = new TeamService();
    async createTeam(req, res) {
        try {
            const teamData = req.body;
            const userId = req.user.userId;
            const team = await this.teamService.createTeam(teamData, userId);
            res.status(201).json({
                success: true,
                data: team
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create team'
            });
        }
    }
    async addTeamMember(req, res) {
        try {
            const memberData = req.body;
            const userId = req.user.userId;
            const member = await this.teamService.addTeamMember(memberData, userId);
            res.status(201).json({
                success: true,
                data: member
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to add team member'
            });
        }
    }
    async getUserTeams(req, res) {
        try {
            const userId = req.user.userId;
            const teams = await this.teamService.getUserTeams(userId);
            res.json({
                success: true,
                data: teams
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get teams'
            });
        }
    }
    async getTeamDetails(req, res) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get team details'
            });
        }
    }
}
//# sourceMappingURL=team.controller.js.map