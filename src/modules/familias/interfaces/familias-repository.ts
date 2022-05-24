import { IBaseRepository } from '@global/interfaces/base-repository'

export interface IFamilia {
  id: number
  nome: string
}

export interface IFamiliasRepository extends IBaseRepository<IFamilia> {}
