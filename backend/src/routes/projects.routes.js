import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = Router();
const projectController = new ProjectController();
router.post('/', authMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getProjects);
router.get('/team/:teamId', authMiddleware, projectController.getTeamProjects);
router.get('/:id', authMiddleware, projectController.getProjectDetails);
// Optional: Add update and delete routes if needed
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);
export default router;
//# sourceMappingURL=projects.routes.js.map