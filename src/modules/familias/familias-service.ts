import { IFamilia, IFamiliasRepository } from './interfaces/familias-repository'

export class FamiliasService {
  constructor(private familiasRepository: IFamiliasRepository) {}

  async findById(id: number): Promise<IFamilia | null> {
    const familia = await this.familiasRepository.findById(id)
    return familia
  }

  async findMany(data?: Partial<IFamilia>): Promise<IFamilia[]> {
    const familias = await this.familiasRepository.findMany(data)
    return familias
  }

  async create(data: Partial<IFamilia>): Promise<IFamilia | null> {
    const familia = await this.familiasRepository.create(data)
    return familia
  }

  async update(id: number, data: Partial<IFamilia>): Promise<IFamilia | null> {
    const familia = await this.familiasRepository.update(id, data)
    return familia
  }

  async remove(id: number): Promise<boolean> {
    const removed = await this.familiasRepository.remove(id)
    return removed
  }
}
