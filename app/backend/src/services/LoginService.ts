import User from '../database/models/UserModel';
import { ILoginService, ILoginUser } from './interfaces/ILogin';

export default class UserService implements ILoginService {
  private _userModel = User;

  async findByEmail(email: string): Promise<ILoginUser | null> {
    const response = await this._userModel.findOne({ where: { email } });
    return response;
  }
}
