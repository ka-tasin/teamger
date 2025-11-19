import type { Request, Response } from 'express';
export declare class TeamController {
    private teamService;
    createTeam(req: Request, res: Response): Promise<void>;
    addTeamMember(req: Request, res: Response): Promise<void>;
    getUserTeams(req: Request, res: Response): Promise<void>;
    getTeamDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=team.controller.d.ts.map