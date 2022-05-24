import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { FamiliasService } from './familias-service'

export class FamiliasController {
  constructor(private familiasService: FamiliasService) {
    this.findById = this.findById.bind(this)
    this.findMany = this.findMany.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async findById(req: Request, resp: Response, next: NextFunction) {
    try {
      const familia = await this.familiasService.findById(+req.params.id)
      if (!familia) {
        throw new createHttpError.NotFound('Família não encontrada.')
      }
      resp.send(familia)
    } catch (error) {
      next(error)
    }
  }

  async findMany(req: Request, resp: Response) {
    const familias = await this.familiasService.findMany()
    resp.send(familias)
  }

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      const familia = await this.familiasService.create(req.body)
      resp.send(familia)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      const familia = await this.familiasService.update(
        +req.params.id,
        req.body
      )
      if (!familia) {
        throw new createHttpError.NotFound('Família não encontrada.')
      }
      resp.send(familia)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, resp: Response, next: NextFunction) {
    try {
      const removed = await this.familiasService.remove(+req.params.id)
      resp.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
