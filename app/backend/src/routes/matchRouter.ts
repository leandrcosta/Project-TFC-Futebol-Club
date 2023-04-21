import { Router } from 'express';
import MatchController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchController = new MatchController();

matchesRouter.get('/', matchController.getAll);

export default matchesRouter;
