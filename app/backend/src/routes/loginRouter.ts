import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyRequiredFields from '../middlewares/validateFieldsLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', verifyRequiredFields('login'), loginController.login);

export default loginRouter;
