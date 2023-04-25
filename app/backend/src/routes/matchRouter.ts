import { Router } from 'express';
import MatchController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateTeamMatch from '../middlewares/validateTeamMatch';

const matchesRouter = Router();
const matchController = new MatchController();

matchesRouter.get('/', matchController.getAll);
matchesRouter.patch('/:id/finish', validateToken, matchController.getMatchFinish);
matchesRouter.patch('/:id', validateToken, matchController.updateGoalsMatch); // sem validar token;
matchesRouter.post('/', validateToken, validateTeamMatch, matchController.createNewMatch);
export default matchesRouter;
