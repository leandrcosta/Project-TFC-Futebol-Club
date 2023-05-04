import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
/* import { Model } from "sequelize"; */
import Matches from "../database/models/MatchModel";
import Team from "../database/models/TeamModel";

import { leaderboardAll, leaderBoardAway, leaderboardHome} from "./mocks/mocks.leaderBoads";
import mocksMatches from "./mocks/mocks.matches";
import mockTeams from './mocks/mock.teams';


chai.use(chaiHttp);
const { expect } = chai;

describe("GET/leaderboard", () => {

  afterEach(() => {
    sinon.restore();
  });

  describe("GET/leaderboard/home", () => {
    describe("Retorna todos os jogos /Casa/ finalizados",
    () => {
      it("retorna todos os jogos com status 200", async () => {
        sinon.stub(Matches, "findAll").resolves(mocksMatches as any);
        sinon.stub(Team, "findAll").resolves(mockTeams as any);

        const response = await chai.request(app).get("/leaderboard/home");

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(leaderboardHome);
      });
    });
  });

  describe("GET/leaderboard/away", () => {
    describe("Placar de classsificação de vitorias dos visitantes", () => {

      it("Retorna todos os jogos /visitantes/ finalizados", async () => {
        sinon.stub(Matches, "findAll").resolves(mocksMatches as any);
        sinon.stub(Team, "findAll").resolves(mockTeams as any);

        const response = await chai.request(app).get("/leaderboard/away");

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(leaderBoardAway);
      });
    });
  });

  describe("GET/leaderboard", () => {
    describe("Placar de classificação geral",
    () => {

      it("Retorna todos os jogos finalizados", async () => {
        sinon.stub(Matches, "findAll").resolves(mocksMatches as any);
        sinon.stub(Team, "findAll").resolves(mockTeams as any);

        const response = await chai.request(app).get("/leaderboard");

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(leaderboardAll);
      });
    });
  });
});
