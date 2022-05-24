import { IBaseRepository } from '@global/interfaces/base-repository'

export interface IGrupoCampo {
  id: number
  nome: string
  created_at: Date
  updated_at: Date
}

export interface IGruposCampoRepository extends IBaseRepository<IGrupoCampo> {}
