import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = Router();
const teamController = new TeamController();
router.post('/', authMiddleware, teamController.createTeam);
router.post('/members', authMiddleware, teamController.addTeamMember);
router.get('/', authMiddleware, teamController.getUserTeams);
router.get('/:id', authMiddleware, teamController.getTeamDetails);
export default router;
//# sourceMappingURL=team.routes.js.map