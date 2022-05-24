import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import { usersRouter } from '@modules/users/users-router'
import { authRouter } from '@modules/auth/auth.router'
import { familiasRouter } from '@modules/familias/familias-router'
import { gruposCampoRouter } from '@modules/grupos-campo/grupos-campo-router'
import { handlerError, routeNotFound } from '@middlewares/errorHandlers'
import { publicadoresRouter } from '@modules/publicadores/publicadores-router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(passport.initialize())

app.get('/api', (req: Request, resp: Response) => {
  resp.send('O TaskPub backend está em operação.')
})

app.use(usersRouter)
app.use(authRouter)
app.use(familiasRouter)
app.use(gruposCampoRouter)
app.use(publicadoresRouter)

app.use(routeNotFound)
app.use(handlerError)

export default app
