import { prisma } from '@config/prisma'
import { Familia } from '@prisma/client'
import { IFamilia, IFamiliasRepository } from './interfaces/familias-repository'

export class FamiliasRepository implements IFamiliasRepository {
  async findById(id: number): Promise<IFamilia | null> {
    const familia = await prisma.familia.findUnique({ where: { id } })
    return familia as IFamilia
  }

  async findFirst(data: Partial<IFamilia>): Promise<IFamilia | null> {
    const familia = await prisma.familia.findFirst({ where: data })
    return familia as IFamilia
  }

  async findMany(data?: Partial<IFamilia>): Promise<IFamilia[]> {
    const familias = await prisma.familia.findMany({ where: data })
    return familias as IFamilia[]
  }

  async create(data: Partial<IFamilia | null>): Promise<IFamilia> {
    const familia = await prisma.familia.create({ data: data as Familia })
    return familia as IFamilia
  }

  async update(id: number, data: Partial<IFamilia>): Promise<IFamilia> {
    const familia = await prisma.familia.update({ where: { id }, data })
    return familia as IFamilia
  }

  async remove(id: number): Promise<boolean> {
    await prisma.familia.delete({ where: { id } })
    return true
  }
}
