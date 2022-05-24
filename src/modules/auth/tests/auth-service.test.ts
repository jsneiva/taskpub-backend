import { createRandomString } from '@helpers/utils'
import { IUser } from '@modules/users/interfaces/users-repository'
import { UsersRepository } from '@modules/users/users-repository'
import { AuthService } from '../auth-service'

const usersRepository = new UsersRepository()
const authService = new AuthService(usersRepository)

const email = createRandomString(20) + '@gmail.com'
const password = '827djHG$*cfl.#!'
let user: IUser

beforeAll(async () => {
  const data = {
    email,
    password,
    username: createRandomString(20),
    url_avatar: createRandomString(30),
    admin: false,
    inativo: false
  }
  user = await usersRepository.create(data)
})

afterAll(async () => {
  if (user) {
    await usersRepository.remove(user.id)
  }
})

describe('Serviço de autenticação de usuários', () => {
  test('Deve autenticar o usuário com sucesso', async () => {
    const loggedUser = await authService.login(email, password)
    expect(loggedUser?.id).toBe(user.id)
  })

  test('Deve rejeitar email ou senha inválida', async () => {
    const users = await Promise.all([
      authService.login(createRandomString(10), password),
      authService.login(email, createRandomString(10)),
      authService.login(email, password)
    ])
    expect(users.findIndex(u => u?.id === user.id)).toBe(2)
  })
})
