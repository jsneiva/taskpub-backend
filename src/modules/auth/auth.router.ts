import express from 'express'
import { UsersRepository } from '@modules/users/users-repository'
import { AuthService } from './auth-service'
import { AuthController } from './auth-controller'

const authController = new AuthController(
  new AuthService(new UsersRepository())
)

const authRouter = express.Router()

authRouter.post('/login', authController.login)

export { authRouter }
