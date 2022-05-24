import express from 'express'
import { UsersController } from './users-controller'
import { UsersService } from './users-service'
import { UsersRepository } from './users-repository'

const usersController = new UsersController(
  new UsersService(new UsersRepository())
)

const usersRouter = express.Router()

//router.use(authenticate())

usersRouter.get('/users', usersController.findMany)
usersRouter.get('/users/:id', usersController.findById)
usersRouter.post('/users', usersController.create)
usersRouter.put('/users/:id', usersController.update)
usersRouter.delete('/users/:id', usersController.remove)

export { usersRouter }
