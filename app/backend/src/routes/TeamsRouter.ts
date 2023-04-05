import { Router } from 'express';
import TeamsController from '../controllers/TeamContoller';

const teamRouter = Router();
const teamController = new TeamsController();

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findByPk);

export default teamRouter;
