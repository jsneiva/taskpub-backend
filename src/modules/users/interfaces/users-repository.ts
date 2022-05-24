import { IBaseRepository } from '@global/interfaces/base-repository'

export interface IUser {
  id: number
  email: string
  username: string
  password: string
  admin: boolean
  inativo: boolean
  url_avatar: string | null
  created_at: Date
  updated_at: Date
}

export interface IUsersRepository extends IBaseRepository<IUser> {
  login(email: string, password: string): Promise<IUser | null>
}
