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
  beforeEach(sinon.restore);
  describe('Quando a requisição é feita com sucesso', () => {
    it('Retorna um array de objetos com todos os times cadastrados e statusCode(200)', async (
      
    ) => {
      sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(mockTeams)
    })
  })

  describe('GET/teams/:id', () => {
    beforeEach(sinon.restore);

    it('Se buscar por /id/, retorna apenas o objeto do time do /id/ buscado', async(

    ) => {
      sinon.stub(Team, 'findByPk').resolves(mockTeams[0] as Team);

      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockTeams[0]);
      })

    it('Caso /id/ não exista no db, retorna status: 404 e mensage: "Team not found"', async () => {

      sinon.stub(Team, 'findByPk').resolves(null);

      const response = await chai.request(app).get('/teams/100');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: 'Team not found' });
    });
  });
});
