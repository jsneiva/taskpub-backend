import {
  IGrupoCampo,
  IGruposCampoRepository
} from './interfaces/grupos-campo-repository'

export class GruposCampoService {
  constructor(private gruposCampoRepository: IGruposCampoRepository) {}

  async findById(id: number): Promise<IGrupoCampo | null> {
    const grupoCampo = await this.gruposCampoRepository.findById(id)
    return grupoCampo
  }

  async findMany(data?: Partial<IGrupoCampo>): Promise<IGrupoCampo[]> {
    const gruposCampo = await this.gruposCampoRepository.findMany(data)
    return gruposCampo
  }

  async create(data: Partial<IGrupoCampo>): Promise<IGrupoCampo | null> {
    const grupoCampo = await this.gruposCampoRepository.create(data)
    return grupoCampo
  }

  async update(
    id: number,
    data: Partial<IGrupoCampo>
  ): Promise<IGrupoCampo | null> {
    const grupoCampo = await this.gruposCampoRepository.update(id, data)
    return grupoCampo
  }

  async remove(id: number): Promise<boolean> {
    const removed = await this.gruposCampoRepository.remove(id)
    return removed
  }
}
