import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  verifyRequiredFields('login'),
  validateFieldsLogin,
  loginController.login,
);
loginRouter.get('/role', validateToken, loginController.getRole);
export default loginRouter;
