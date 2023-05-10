import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import CreateHttpError from 'http-errors'

import { EntityNotFoundError, InvalidArgumentError } from '../../domain'
import { HttpStatus } from '../../domain/Common'
import { HttpError, HttpValidationModule } from '../platform-fastify'

export class DefaultHttpErrorHandler implements HttpValidationModule<unknown> {
  // validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): void {
  validationCompiler(): void {
    // do nothing
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is our HTTP
    if ((err as unknown as HttpError)?.code) {
      const error = CreateHttpError(err.code, err.message)
      return res.send(error)
    }
    if (err instanceof InvalidArgumentError) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(CreateHttpError(HttpStatus.UNPROCESSABLE_ENTITY, err.message))
    }
    if (err instanceof EntityNotFoundError) {
      return res.status(HttpStatus.NOT_FOUND).send(CreateHttpError(HttpStatus.NOT_FOUND, err.message))
    }
    // TODO: Improve general error handler to catch unknown errors
    return res.status(500).send(new Error(`GeneralRequestValidation[errorHandler]: Unhandled error ${err.message}`))
  }

  // schemaBuilder(_schema: FastifySchema, _key: keyof FastifySchema, _method?: RequestMethod) {
  schemaBuilder() {
    // do nothing
  }
}
