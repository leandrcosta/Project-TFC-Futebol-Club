import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
/* import { Model } from "sequelize"; */
import { Response } from "superagent";
import { isUserValideLogin, isUserInvalideLogin} from "./mocks/mock.Login";

chai.use(chaiHttp);
const { expect } = chai;

describe("POST/login", () => {
  beforeEach(sinon.restore);

  it("Testando se ao usar um /user/ valido, retorna um token", async () => {
    const response: Response = await chai.request(app).post("/login").send(isUserValideLogin);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("token"); // vai verificar se existe a chave token
  });

  it("Testando se ao usar um /user/ invalido, retorna uma message de error", async () => {
    const response: Response = await chai.request(app).post("/login").send(isUserInvalideLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});

// https://www.tabnine.com/code/javascript/functions/bcrypt-nodejs/compareSync
// emailTest = 'admin@admin.com';
// senhatest = 'secret_admin';
