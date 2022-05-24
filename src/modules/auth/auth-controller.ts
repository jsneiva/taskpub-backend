import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { AuthService } from './auth-service'

export class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this)
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await this.authService.login(email, password)
      if (!user) {
        throw new createHttpError.Unauthorized('Usuário ou senha inválido!')
      }
      resp.send(user)
    } catch (error) {
      next(error)
    }
  }
}
