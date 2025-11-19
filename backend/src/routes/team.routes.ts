import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const teamController = new TeamController();

router.post('/', authMiddleware, teamController.createTeam.bind(teamController));
router.post('/members', authMiddleware, teamController.addTeamMember.bind(teamController));
router.get('/', authMiddleware, teamController.getUserTeams.bind(teamController));
router.get('/:id', authMiddleware, teamController.getTeamDetails.bind(teamController));

export default router;