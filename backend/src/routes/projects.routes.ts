import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const projectController = new ProjectController();

router.post('/', authMiddleware, projectController.createProject.bind(projectController));
router.get('/', authMiddleware, projectController.getProjects.bind(projectController));
router.get('/team/:teamId', authMiddleware, projectController.getTeamProjects.bind(projectController));
router.get('/:id', authMiddleware, projectController.getProjectDetails.bind(projectController));

// Optional: Add update and delete routes if needed
router.put('/:id', authMiddleware, projectController.updateProject.bind(projectController));
router.delete('/:id', authMiddleware, projectController.deleteProject.bind(projectController));

export default router;