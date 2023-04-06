export interface ILoginUser {
  email: string
  password: string
}

export interface ILoginService {
  findByEmail(email: string): Promise <ILoginUser | null >
}
