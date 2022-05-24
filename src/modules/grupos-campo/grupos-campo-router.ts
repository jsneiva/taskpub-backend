import { Router } from 'express'
import { GruposCampoController } from './grupos-campo-controller'
import { GruposCampoService } from './grupos-campo-service'
import { GruposCampoRepository } from './grupos-campo-repository'

const gruposCampoController = new GruposCampoController(
  new GruposCampoService(new GruposCampoRepository())
)

const gruposCampoRouter = Router()

// gruposCampoRouter.use(authenticate())

gruposCampoRouter.get('/grupos-campo', gruposCampoController.findMany)
gruposCampoRouter.get('/grupos-campo/:id', gruposCampoController.findById)
gruposCampoRouter.post('/grupos-campo', gruposCampoController.create)
gruposCampoRouter.put('/grupos-campo/:id', gruposCampoController.update)
gruposCampoRouter.delete('/grupos-campo/:id', gruposCampoController.remove)

export { gruposCampoRouter }
