import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = Router();
const taskController = new TaskController();
// Create a new task
router.post('/', authMiddleware, taskController.createTask);
// Get tasks with optional filters
router.get('/', authMiddleware, taskController.getTasks);
// Update a task
router.put('/:id', authMiddleware, taskController.updateTask);
// Delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);
// Reassign tasks for a team
router.post('/teams/:teamId/reassign', authMiddleware, taskController.reassignTasks);
// Get team member summary
router.get('/teams/:teamId/summary', authMiddleware, taskController.getTeamMemberSummary);
export default router;
//# sourceMappingURL=task.routes.js.map