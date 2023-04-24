// import IMatches from './interfaces/IMatches';
import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatches, { MathGoals } from './interfaces/IMatches';

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

  async isMatchFinish(id: string): Promise<void> {
    await this._matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  // Useo o type para /match/ so aceite estes dois valores: { homeTeamGoals e awayTeamGoals}
  async updateGoalsMatch(id:string, match: MathGoals)
    : Promise <void> {
    await this._matchesModel.update(
      { homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}
