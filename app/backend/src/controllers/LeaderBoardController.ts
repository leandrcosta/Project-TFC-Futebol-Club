import { Request, Response } from 'express';
import ServiceLeaderboards from '../services/LeaderBoardService';

export default class ControllerLeaderboards {
  static leaderboardsHome = async (req: Request, res: Response) => {
    const leaderboardHome = await ServiceLeaderboards.leaderboardsHome();
    return res.status(200).json(leaderboardHome);
  };

  static leaderboardsAway = async (req: Request, res: Response) => {
    const leaderboardAway = await ServiceLeaderboards.leaderboardsAway();
    return res.status(200).json(leaderboardAway);
  };

  static leaderboardsAll = async (req: Request, res: Response) => {
    const leaderboard = await ServiceLeaderboards.leaderboardsAll();
    return res.status(200).json(leaderboard);
  };
}
