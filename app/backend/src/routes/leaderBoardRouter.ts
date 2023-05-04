import { Router } from 'express';
import ControllerLeaderboards from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', ControllerLeaderboards.leaderboardsHome);
leaderBoardRouter.get('/away', ControllerLeaderboards.leaderboardsAway);
leaderBoardRouter.get('/', ControllerLeaderboards.leaderboardsAll);

export default leaderBoardRouter;
