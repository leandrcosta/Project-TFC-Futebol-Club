// import IMatches from './interfaces/IMatches';
import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatches from './interfaces/IMatches';

export default class MatchesSerivice {
  private _matchesModel = Matches;

  async getAll(): Promise<IMatches[] | unknown> {
    const getAllMatches = await this._matchesModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return getAllMatches;
  }

  async getProgressMatches(query: boolean): Promise<IMatches[] | unknown> {
    const matches = await this._matchesModel.findAll({
      where: {
        inProgress: query,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
