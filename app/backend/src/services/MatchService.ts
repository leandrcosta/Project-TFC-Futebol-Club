// import IMatches from './interfaces/IMatches';
import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatches, { IMathGoals, INewMatch } from './interfaces/IMatches';

export default class MatchesSerivice {
  private _matchesModel = Matches;

  async getAll(): Promise<IMatches[] | unknown> {
    try {
      const getAllMatches = await this._matchesModel.findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
      return getAllMatches;
    } catch (error) {
      console.log(error);
    }
  }

  async getProgressMatches(query: boolean): Promise<IMatches[] | unknown> {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async isMatchFinish(id: string): Promise<void> {
    try {
      await this._matchesModel.update(
        { inProgress: false },
        { where: { id } },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Useo o type para /match/ so aceite estes dois valores: { homeTeamGoals e awayTeamGoals}
  async updateGoalsMatch(id:number, match: IMathGoals) {
    try {
      const result = await this._matchesModel.update(
        { homeTeamGoals: match.homeTeamGoals,
          awayTeamGoals: match.awayTeamGoals,
        },
        { where: { id } },
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewMatch(match: INewMatch) {
    try {
      const newMatch = await this._matchesModel.create(
        { ...match, inProgress: true },
      );
      return newMatch;
    } catch (error) {
      console.log(error);
    }
  }
}
