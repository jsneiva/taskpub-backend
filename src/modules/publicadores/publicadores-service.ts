import {
  IPublicador,
  IPublicadoresRepository
} from './interfaces/publicadores-repository'

export class PublicadoresService {
  constructor(private publicadoresRepository: IPublicadoresRepository) {}

  async findById(id: number): Promise<IPublicador | null> {
    const publicador = await this.publicadoresRepository.findById(id)
    return publicador
  }

  async findMany(data?: Partial<IPublicador>): Promise<IPublicador[]> {
    const publicadores = await this.publicadoresRepository.findMany(data)
    return publicadores
  }

  async create(data: Partial<IPublicador>): Promise<IPublicador | null> {
    const publicador = await this.publicadoresRepository.create(data)
    return publicador
  }

  async update(
    id: number,
    data: Partial<IPublicador>
  ): Promise<IPublicador | null> {
    const publicador = await this.publicadoresRepository.update(id, data)
    return publicador
  }

  async remove(id: number): Promise<boolean> {
    const removed = await this.publicadoresRepository.remove(id)
    return removed
  }
}
