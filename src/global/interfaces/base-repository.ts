export interface IBaseRepository<E> {
  findById(id: number | string): Promise<E | null>
  findFirst(data: Partial<E>): Promise<E | null>
  findMany(data?: Partial<E>): Promise<E[]>
  create(data: Partial<E>): Promise<E>
  update(id: number | string, data: Partial<E>): Promise<E>
  remove(id: number | string): Promise<boolean>
}
