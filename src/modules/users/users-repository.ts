import { hashSync, compareSync } from 'bcrypt'
import { prisma } from '@config/prisma'
import { User } from '@prisma/client'
import { IUser, IUsersRepository } from './interfaces/users-repository'

export class UsersRepository implements IUsersRepository {
  async findById(id: number): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  }

  async findFirst(data: Partial<IUser>): Promise<IUser | null> {
    const user = await prisma.user.findFirst({ where: data })
    return user
  }

  async findMany(data?: Partial<IUser>): Promise<IUser[]> {
    const users = await prisma.user.findMany({ where: data })
    return users as IUser[]
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    this.beforeSave(data)
    const user = await prisma.user.create({ data: data as User })
    return user
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser> {
    this.beforeSave(data)
    const user = await prisma.user.update({ where: { id }, data })
    return user
  }

  async remove(id: number): Promise<boolean> {
    await prisma.user.delete({ where: { id } })
    return true
  }

  async login(email: string, password: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user && compareSync(password, user.password)) {
      return user
    }
    return null
  }

  private beforeSave(data: Partial<IUser>) {
    if (data.password) {
      data.password = hashSync(data.password, 10)
    }
  }
}
