import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

import { HttpStatus } from '../../domain/Common/index.js'
import { EntityNotFoundError, HttpError, InvalidArgumentError } from '../../domain/index.js'
import type { HttpErrorHandler } from '../Fastify/index.js'

export class DefaultHttpErrorHandler implements HttpErrorHandler {
  // validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): void {
  // validationCompiler(): void {
  //   // do nothing
  // }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    let statusCode: number | undefined
    if (err instanceof InvalidArgumentError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY
    } else if (err instanceof EntityNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND
    }
    if (statusCode) {
      const response = new HttpError({
        statusCode,
        error: HttpStatus[+statusCode] ?? '',
        message: err.message,
        path: req.raw.url,
        code: err.code,
        stack: err.stack,
      })
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(response)
    }
  }

  // // schemaBuilder(_schema: FastifySchema, _key: keyof FastifySchema, _method?: RequestMethod) {
  // schemaBuilder() {
  //   // do nothing
  // }
}
