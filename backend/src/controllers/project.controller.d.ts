import type { Request, Response } from 'express';
export declare class ProjectController {
    private projectService;
    constructor();
    createProject: (req: Request, res: Response) => Promise<void>;
    getProjects: (req: Request, res: Response) => Promise<void>;
    getTeamProjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getProjectById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getProjectDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=project.controller.d.ts.map