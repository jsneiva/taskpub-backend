import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { GruposCampoService } from './grupos-campo-service'

export class GruposCampoController {
  constructor(private gruposCampoService: GruposCampoService) {
    this.findById = this.findById.bind(this)
    this.findMany = this.findMany.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async findById(req: Request, resp: Response, next: NextFunction) {
    try {
      const grupoCampo = await this.gruposCampoService.findById(+req.params.id)
      if (!grupoCampo) {
        throw new createHttpError.NotFound('Grupo de campo não encontrado.')
      }
      resp.send(grupoCampo)
    } catch (error) {
      next(error)
    }
  }

  async findMany(req: Request, resp: Response) {
    const gruposCampo = await this.gruposCampoService.findMany()
    resp.send(gruposCampo)
  }

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      const grupoCampo = await this.gruposCampoService.create(req.body)
      resp.send(grupoCampo)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      const grupoCampo = await this.gruposCampoService.update(
        +req.params.id,
        req.body
      )
      if (!grupoCampo) {
        throw new createHttpError.NotFound('Grupo de campo não encontrado.')
      }
      resp.send(grupoCampo)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, resp: Response, next: NextFunction) {
    try {
      const removed = await this.gruposCampoService.remove(+req.params.id)
      resp.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
