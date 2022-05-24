import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export function routeNotFound(req: Request, res: Response) {
  throw new createHttpError.NotFound(
    'URL (' + req.path + ') ou método (' + req.method + ') inexistente!'
  )
}

export function handlerError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || err.statusCode || 500
  const message = err.message || 'Mensagem de erro não encontrada.'

  res.status(status).json({ status, message })
}
