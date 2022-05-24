import { GrupoCampo } from '@prisma/client'
import { prisma } from '@config/prisma'
import {
  IGrupoCampo,
  IGruposCampoRepository
} from './interfaces/grupos-campo-repository'

export class GruposCampoRepository implements IGruposCampoRepository {
  async findById(id: number): Promise<IGrupoCampo | null> {
    const grupoCampo = await prisma.grupoCampo.findUnique({ where: { id } })
    return grupoCampo
  }

  async findFirst(data: Partial<IGrupoCampo>): Promise<IGrupoCampo | null> {
    const grupoCampo = await prisma.grupoCampo.findFirst({ where: data })
    return grupoCampo
  }

  async findMany(data?: Partial<IGrupoCampo>): Promise<IGrupoCampo[]> {
    const grupos = await prisma.grupoCampo.findMany({ where: data })
    return grupos
  }

  async create(data: Partial<IGrupoCampo>): Promise<IGrupoCampo> {
    const grupoCampo = await prisma.grupoCampo.create({
      data: data as GrupoCampo
    })
    return grupoCampo
  }

  async update(id: number, data: Partial<IGrupoCampo>): Promise<IGrupoCampo> {
    const grupoCampo = await prisma.grupoCampo.update({ where: { id }, data })
    return grupoCampo
  }

  async remove(id: number): Promise<boolean> {
    await prisma.grupoCampo.delete({ where: { id } })
    return true
  }
}
