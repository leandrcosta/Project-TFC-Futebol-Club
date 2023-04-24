import { Router } from 'express';
import MatchController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();
const matchController = new MatchController();

matchesRouter.get('/', matchController.getAll);
matchesRouter.patch('/:id', validateToken, matchController.updateGoalsMatch);
matchesRouter.patch('/:id/finish', validateToken, matchController.getMatchFinish);

export default matchesRouter;
