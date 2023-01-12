import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'

import { EntityNotFoundException, InvalidArgumentException } from '../../domain'
import { HttpStatus } from '../common'
import { HttpError, ValidationModule } from '../platform-fastify'

export class GeneralRequestValidation implements ValidationModule<unknown> {
  validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): any {
    //
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is our HTTP
    if ((err as unknown as HttpError)?.code) {
      return res.send(CreateHttpError(err.code, err.message))
    }
    if (err instanceof InvalidArgumentException) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(CreateHttpError(HttpStatus.UNPROCESSABLE_ENTITY, err.message))
    }
    if (err instanceof EntityNotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).send(CreateHttpError(HttpStatus.NOT_FOUND, err.message))
    }
    // TODO: Improve general error handler to catch unknown errors
    return res.status(500).send(new Error(`GeneralRequestValidation[errorHandler]: Unhandled error ${err.message}`))
  }

  schemaBuilder(_schema: FastifySchema, _key: keyof FastifySchema, _group?: any) {
    return false
  }

  getMethodGroup(_group?: any) {
    return undefined
  }
}
