import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _service = new TeamService();

  findAll = async (req: Request, res: Response): Promise<Response | void> => {
    const teams = await this._service.findAll();
    return res.status(200).json(teams);
  };

  findByPk = async (req: Request, res: Response): Promise<Response | null> => {
    const { id } = req.params;
    const result = await this._service.findByPk(Number(id));
    if (!result) return res.status(404).json({ message: 'Team not found' });
    return res.status(200).json(result);
  };
}
