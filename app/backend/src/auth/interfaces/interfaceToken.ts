export interface IUserPayload {
  email: string;
}

export default interface ITokenService {
  sign(payload: IUserPayload): string;
}
