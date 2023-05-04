import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
/* import { Model } from "sequelize"; */
import Team from '../database/models/TeamModel';
import mockTeams from './mocks/mock.teams';

chai.use(chaiHttp);
const { expect } = chai;

describe("GET/teams", () => {
  describe('Quando a requisição é feita com sucesso', () => {
    it('Retorna um array de objetos com todos os times cadastrados e statusCode(200)', async (
      
    ) => {
      sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(mockTeams)
    })
  })
});
