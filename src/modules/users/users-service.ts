import { IUser, IUsersRepository } from './interfaces/users-repository'

export class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async findById(id: number): Promise<IUser | null> {
    const user = await this.usersRepository.findById(id)
    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.usersRepository.findFirst({ email })
    return user
  }

  async findMany(data?: Partial<IUser>): Promise<IUser[]> {
    const users = await this.usersRepository.findMany(data)
    return users
  }

  async create(data: Partial<IUser>): Promise<IUser | null> {
    const user = await this.usersRepository.create(data)
    return user
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    const user = await this.usersRepository.update(id, data)
    return user
  }

  async remove(id: number): Promise<boolean> {
    const removed = await this.usersRepository.remove(id)
    return removed
  }
}
