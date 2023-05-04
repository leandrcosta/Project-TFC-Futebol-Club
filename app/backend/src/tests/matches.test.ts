import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
/* import { Model } from "sequelize"; */
import Matches from "../database/models/MatchModel";
import mocksMatches from "./mocks/mocks.matches";

chai.use(chaiHttp);
const { expect } = chai;

describe("GET/matches", () => {
  beforeEach(sinon.restore);

  describe("Quando a requisição é feita com sucesso", () => {
    it("Retorna um array de objetos com todos as /Matches/ cadastradas e statusCode(200)",
    async () => {
      sinon.stub(Matches, "findAll").resolves(mocksMatches as any);

      const response = await chai.request(app).get("/matches");

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(mocksMatches);
    });
  });
});
