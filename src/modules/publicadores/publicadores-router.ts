import { Router } from 'express'
import { PublicadoresController } from './publicadores-controller'
import { PublicadoresService } from './publicadores-service'
import { PublicadoresRepository } from './publicadores-repository'

const publicadoresController = new PublicadoresController(
  new PublicadoresService(new PublicadoresRepository())
)

const publicadoresRouter = Router()

// publicadoresRouter.use(authenticate())

publicadoresRouter.get('/publicadores', publicadoresController.findMany)
publicadoresRouter.get('/publicadores/:id', publicadoresController.findById)
publicadoresRouter.post('/publicadores', publicadoresController.create)
publicadoresRouter.put('/publicadores/:id', publicadoresController.update)
publicadoresRouter.delete('/publicadores/:id', publicadoresController.remove)

export { publicadoresRouter }
