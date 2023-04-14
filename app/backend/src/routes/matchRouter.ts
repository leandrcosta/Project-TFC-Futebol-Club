import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchController = new MatchesController();

matchesRouter.get('/', matchController.getAll);

export default matchesRouter;
