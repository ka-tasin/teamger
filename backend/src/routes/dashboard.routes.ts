import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const dashboardController = new DashboardController();

router.get('/stats', authMiddleware, dashboardController.getDashboardStats.bind(dashboardController));
router.get('/stats/team/:teamId', authMiddleware, dashboardController.getDashboardStats.bind(dashboardController));

export default router;