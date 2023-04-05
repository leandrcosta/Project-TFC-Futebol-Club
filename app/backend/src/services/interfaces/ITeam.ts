export default interface ITeam {
  id: number
  teamName: string
}

export interface ITeamService {
  findAll(): Promise <ITeam[] | void>
  findByPk(id:number): Promise <ITeam | null>
}
