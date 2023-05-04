// Criei as queries no e usei o sequelize, igual no trybesmith
import { ILeaderBoard } from './interfaces/ILeaderBoard';
import {
  leaderboardHome,
  leaderboardAway,
  leaderboardAll,
} from '../database/models/LeaderBoard';
import sequelize from '../database/models';

// Declaração de uma classe chamada ServiceLeaderboards
export default class ServiceLeaderboards {
  // Método que retorna uma lista de ILeaderBoard para os jogos em casa
  static async leaderboardsHome(): Promise<ILeaderBoard[][] | unknown> {
    // Faz uma consulta na tabela "leaderboards" do banco de dados usando o comando "homeLeaderboards"
    const [leaderboards] = await sequelize.query(leaderboardHome);
    return leaderboards;
  }

  // Método que retorna uma lista de ILeaderBoard para os jogos fora de casa
  static async leaderboardsAway(): Promise<ILeaderBoard[][] | unknown> {
    // Faz uma consulta na tabela "leaderboards" do banco de dados usando o comando "awayLeaderboards"
    const [leaderboards] = await sequelize.query(leaderboardAway);
    return leaderboards;
  }

  // Método que retorna uma lista de ILeaderBoard para todos os jogos
  static async leaderboardsAll(): Promise<ILeaderBoard[][] | unknown> {
    // Faz uma consulta na tabela "leaderboards" do banco de dados usando o comando "allLeaderboards"
    const [leaderboards] = await sequelize.query(leaderboardAll);
    return leaderboards;
  }
}
