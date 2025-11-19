import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const taskController = new TaskController();

// Create a new task
router.post('/', authMiddleware, taskController.createTask.bind(taskController));

// Get tasks with optional filters
router.get('/', authMiddleware, taskController.getTasks.bind(taskController));

// Update a task
router.put('/:id', authMiddleware, taskController.updateTask.bind(taskController));

// Delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask.bind(taskController));

// Reassign tasks for a team
router.post('/teams/:teamId/reassign', authMiddleware, taskController.reassignTasks.bind(taskController));

// Get team member summary
router.get('/teams/:teamId/summary', authMiddleware, taskController.getTeamMemberSummary.bind(taskController));

export default router;