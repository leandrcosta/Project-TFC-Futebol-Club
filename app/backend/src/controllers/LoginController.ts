import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { createToken } from '../auth/authFunctions';

export default class LoginController {
  private _loginService = new LoginService();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Refatorar o codigo, colocando a função em outro arquivo e importar aqui.
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const result = await this._loginService.findByEmail(email);

    if (password < 6) { // se a senha ou email estiver diferente do db: lançar erro
      return res.status(401).json({ message: 'xablau' });
    }

    const passwordInvalid = bcrypt.compareSync(password, result?.password || ''); // se rfor null ou undefined, retorna ''
    if (!passwordInvalid || password.length < 6) { // se a senha ou email estiver diferente do db: lançar erro
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (result) {
      const token = createToken(email);
      return res.status(200).json({ token });
    }
  };
}
// https://www.tabnine.com/code/javascript/functions/bcrypt-nodejs/compareSync
// emailTest = 'admin@admin.com';
// senhatest = 'secret_admin';
