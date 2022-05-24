import { IUsersRepository } from '@modules/users/interfaces/users-repository'
import { ILoggedUser } from './interfaces/logged-user'

export class AuthService {
  constructor(private usersRepository: IUsersRepository) {}

  async login(email: string, password: string): Promise<ILoggedUser | null> {
    const user = await this.usersRepository.login(email, password)
    if (!user) {
      return null
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      url_avatar: user.url_avatar
    }
  }
}
