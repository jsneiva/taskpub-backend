import { prisma } from '@config/prisma'
import { Publicador } from '@prisma/client'
import {
  IPublicador,
  IPublicadoresRepository
} from './interfaces/publicadores-repository'

export class PublicadoresRepository implements IPublicadoresRepository {
  async findById(id: number): Promise<IPublicador | null> {
    const publicador = await prisma.publicador.findUnique({ where: { id } })
    return publicador as unknown as IPublicador
  }

  async findFirst(data: Partial<IPublicador>): Promise<IPublicador | null> {
    const publicador = await prisma.publicador.findFirst({
      where: data as Publicador
    })
    return publicador as unknown as IPublicador
  }

  async findMany(data?: Partial<IPublicador>): Promise<IPublicador[]> {
    const publicadores = await prisma.publicador.findMany({
      where: data as Publicador
    })
    return publicadores as unknown as IPublicador[]
  }

  async create(data: Partial<IPublicador>): Promise<IPublicador> {
    const publicador = await prisma.publicador.create({
      data: data as IPublicador
    })
    return publicador as unknown as IPublicador
  }

  async update(id: number, data: Partial<IPublicador>): Promise<IPublicador> {
    const publicador = await prisma.publicador.update({
      where: { id },
      data: data as Publicador
    })
    return publicador as unknown as IPublicador
  }

  async remove(id: number): Promise<boolean> {
    await prisma.publicador.delete({ where: { id } })
    return true
  }
}
