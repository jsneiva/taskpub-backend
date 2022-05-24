import { createRandomString } from '@helpers/utils'
import { IUser } from '../interfaces/users-repository'
import { UsersRepository } from '../users-repository'
import { UsersService } from '../users-service'

const usersService = new UsersService(new UsersRepository())

function randomUserData() {
  return {
    username: createRandomString(20),
    email: createRandomString(20) + '@gmail.com',
    password: createRandomString(10),
    url_avatar: createRandomString(30),
    admin: false,
    inativo: false
  }
}

async function createNewUser(): Promise<IUser> {
  const data = randomUserData()
  const user = await usersService.create(data)
  return user as IUser
}

describe('Serviço de usuários', () => {
  test('Deve incluir um usuário', async () => {
    const newUser = await createNewUser()
    const user = await usersService.findById(newUser.id)
    expect(user?.id).toBe(newUser.id)
    await usersService.remove(newUser.id)
  })

  test('Deve alterar os dados de um usuário', async () => {
    const newUser = await createNewUser()
    const newData = randomUserData()
    const user = await usersService.update(newUser.id, newData)
    expect(user).toMatchObject({
      id: newUser.id,
      username: newData.username,
      email: newData.email
    })
    await usersService.remove(newUser.id)
  })

  test('Deve rejeitar nome de usuário ou e-mail duplicado', async () => {
    const [userA, userB] = await Promise.all([createNewUser(), createNewUser()])
    let data = randomUserData()
    data.username = userA.username
    await expect(() => usersService.create(data)).rejects.toThrowError()
    await expect(() =>
      usersService.update(userB.id, data)
    ).rejects.toThrowError()

    data = randomUserData()
    data.email = userA.email
    await expect(() => usersService.create(data)).rejects.toThrowError()
    await expect(() =>
      usersService.update(userB.id, data)
    ).rejects.toThrowError()

    await Promise.all([
      usersService.remove(userA.id),
      usersService.remove(userB.id)
    ])
  })

  test('Deve excluir um usuário', async () => {
    const newUser = await createNewUser()
    const removed = await usersService.remove(newUser.id)
    expect(removed).toBe(true)
  })

  test('Deve buscar um usuário pelo e-mail', async () => {
    const newUser = await createNewUser()
    const user = await usersService.findByEmail(newUser.email)
    expect(user?.email).toBe(newUser.email)
    await usersService.remove(newUser.id)
  })

  test('Deve listar todos os usuários', async () => {
    const users = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createNewUser())
    )
    const list = await usersService.findMany()
    expect(list.length >= users.length).toBe(true)
    await Promise.all(users.map(user => usersService.remove(user.id)))
  })

  test('Deve listar usuários com filtros de busca', async () => {
    const users = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createNewUser())
    )
    const data = {
      email: users[0].email,
      username: users[0].username
    }
    const list = await usersService.findMany(data)
    expect(list).toHaveLength(1)
    await Promise.all(users.map(user => usersService.remove(user.id)))
  })
})
