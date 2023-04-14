export interface ILoginUser {
  email: string
  password: string
  role?:string
}
export interface ILoginService {
  findByEmail(email: string): Promise <ILoginUser | null >
}
