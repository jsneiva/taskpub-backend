import createHttpError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { UsersService } from './users-service'

export class UsersController {
  constructor(private usersService: UsersService) {
    this.findById = this.findById.bind(this)
    this.findMany = this.findMany.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async findById(req: Request, resp: Response, next: NextFunction) {
    try {
      const user = await this.usersService.findById(+req.params.id)
      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado.')
      }
      resp.send(user)
    } catch (error) {
      next(error)
    }
  }

  async findMany(req: Request, resp: Response) {
    const users = await this.usersService.findMany()
    resp.send(users)
  }

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      const user = await this.usersService.create(req.body)
      resp.send(user)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      const user = await this.usersService.update(+req.params.id, req.body)
      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado.')
      }
      resp.send(user)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, resp: Response, next: NextFunction) {
    try {
      const removed = await this.usersService.remove(+req.params.id)
      resp.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
