export default interface IMatch {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
// https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
export interface IMathGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
export interface INewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
