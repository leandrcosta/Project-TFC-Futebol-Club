import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
// Refatorar após aprovado
export default class MatchController {
  private matchService = new MatchService();

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }
    const matchesProgress = await this.matchService.getProgressMatches(inProgress === 'true');
    return res.status(200).json(matchesProgress);
  };

  getMatchFinish = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.matchService.isMatchFinish(id);
    return res.status(200).json({ message: 'Finished' });
  };
}

// 1º => verifico se o inProgress é indefinido(não tem na rota)
// 2º => Caso ele seja indefinido, retorna todas as matches.
// 3º => Caso inProgress === true, retornar apenas as matches que possuem a chave inProgress: true
// 4º => Ultimo caso retorna as matches que possuem inProgress===false
// Estava dando erro pois eu tava tentando criar uma outra função na controller que iria resultar em outras duas rotas
