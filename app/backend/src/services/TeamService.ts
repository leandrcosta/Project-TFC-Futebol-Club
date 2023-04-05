import Team from '../database/models/TeamModel';
import ITeam, { ITeamService } from './interfaces/ITeam';

export default class TeamService implements ITeamService {
  private teamModel = Team;

  async findAll(): Promise<ITeam[] | void> {
    const result = await this.teamModel.findAll();
    return result;
  }

  async findByPk(id: number): Promise<ITeam | null> {
    const result = await this.teamModel.findByPk(id);
    return result;
  }
}
