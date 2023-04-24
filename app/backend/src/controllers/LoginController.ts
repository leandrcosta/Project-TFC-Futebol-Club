import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { createToken } from '../auth/authFunctions';

export default class LoginController {
  private _loginService = new LoginService();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this._loginService.findByEmail(email);
    const passwordInvalid = bcrypt.compareSync(password, result?.password || ''); // se rfor null ou undefined, retorna ''

    if (!passwordInvalid) { // se a senha ou email estiver diferente do db: lançar erro
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (result) {
      const token = createToken(email);
      return res.status(200).json({ token });
    }
  };

  getRole = async (req: Request, res: Response) => {
    // console.log('role ==> ', req.body); // retorna { email }
    const result = await this._loginService.findByEmail(req.body.payload.data); // verifico user
    return res.status(200).json({ role: result?.role }); // validei o token na rota, e agora so retorno a { role } do user na rota login/role
  };
}
// https://www.tabnine.com/code/javascript/functions/bcrypt-nodejs/compareSync
// emailTest = 'admin@admin.com';
// senhatest = 'secret_admin';
