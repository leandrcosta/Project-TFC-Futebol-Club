import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchesController {
  private matchService = new MatchService();

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };
}
