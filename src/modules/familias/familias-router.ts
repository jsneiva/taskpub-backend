import { Router } from 'express'
import { FamiliasController } from './familias-controller'
import { FamiliasRepository } from './familias-repository'
import { FamiliasService } from './familias-service'

const familiasController = new FamiliasController(
  new FamiliasService(new FamiliasRepository())
)

const familiasRouter = Router()

//familiaRouter.use(authenticate())

familiasRouter.get('/familias', familiasController.findMany)
familiasRouter.get('/familias/:id', familiasController.findById)
familiasRouter.post('/familias', familiasController.create)
familiasRouter.put('/familias/:id', familiasController.update)
familiasRouter.delete('/familias/:id', familiasController.remove)

export { familiasRouter }
