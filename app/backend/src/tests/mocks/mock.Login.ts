import { ILoginUser } from "../../services/interfaces/ILogin";

const isUserValideLogin: ILoginUser = {
  email: "admin@admin.com",
  password: "secret_admin",
};

const isUserInvalideLogin: ILoginUser = {
  email: "leandrocosta@test.com",
  password: "xablau",
};

export  { isUserValideLogin, isUserInvalideLogin };
