import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { PublicadoresService } from './publicadores-service'

export class PublicadoresController {
  constructor(private publicadoresService: PublicadoresService) {
    this.findById = this.findById.bind(this)
    this.findMany = this.findMany.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async findById(req: Request, resp: Response, next: NextFunction) {
    try {
      const publicador = await this.publicadoresService.findById(+req.params.id)
      if (!publicador) {
        throw new createHttpError.NotFound('Publicador não encontrado.')
      }
      resp.send(publicador)
    } catch (error) {
      next(error)
    }
  }

  async findMany(req: Request, resp: Response) {
    const publicadores = await this.publicadoresService.findMany()
    resp.send(publicadores)
  }

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      const publicador = await this.publicadoresService.create(req.body)
      resp.send(publicador)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      const publicador = await this.publicadoresService.update(
        +req.params.id,
        req.body
      )
      if (!publicador) {
        throw new createHttpError.NotFound('Publicador não encontrado.')
      }
      resp.send(publicador)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, resp: Response, next: NextFunction) {
    try {
      const removed = await this.publicadoresService.remove(+req.params.id)
      resp.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
