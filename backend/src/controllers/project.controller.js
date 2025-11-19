import { ProjectService } from '../services/project.services';
export class ProjectController {
    projectService;
    constructor() {
        this.projectService = new ProjectService();
    }
    createProject = async (req, res) => {
        try {
            const project = await this.projectService.createProject(req.body, req.user.userId);
            res.status(201).json({ success: true, data: project });
        }
        catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
    getProjects = async (req, res) => {
        try {
            const projects = await this.projectService.getProjectsByOwner(req.user.userId);
            res.status(200).json({ success: true, data: projects });
        }
        catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
    getTeamProjects = async (req, res) => {
        try {
            const { teamId } = req.params;
            if (!teamId) {
                return res.status(400).json({ success: false, error: 'teamId parameter is required' });
            }
            const projects = await this.projectService.getTeamProjects(teamId);
            res.status(200).json({ success: true, data: projects });
        }
        catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
    getProjectById = async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ success: false, error: 'id parameter is required' });
            }
            const project = await this.projectService.getProjectById(req.params.id);
            res.status(200).json({ success: true, data: project });
        }
        catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    };
    getProjectDetails = async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ success: false, error: 'id parameter is required' });
            }
            const project = await this.projectService.getProjectById(req.params.id);
            res.status(200).json({ success: true, data: project });
        }
        catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    };
    updateProject = async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ success: false, error: 'id parameter is required' });
            }
            const project = await this.projectService.updateProject(req.params.id, req.body, req.user.userId);
            res.status(200).json({ success: true, data: project });
        }
        catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
    deleteProject = async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ success: false, error: 'id parameter is required' });
            }
            await this.projectService.deleteProject(req.params.id, req.user.userId);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
}
//# sourceMappingURL=project.controller.js.map