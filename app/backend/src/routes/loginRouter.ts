import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  verifyRequiredFields('login'),
  validateFieldsLogin,
  loginController.login,
);

export default loginRouter;
