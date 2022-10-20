import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'

import { HttpError, ValidationModule } from './platform-fastify'

export class GeneralValidationModule implements ValidationModule<unknown> {
  validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): any {
    //
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is our HTTP
    if ((err as unknown as HttpError)?.code) {
      return res.send(CreateHttpError(err.code, err.message))
    }
    // TODO: Improve general error handler to catch unknown errors
    return res.status(500).send(new Error(`GeneralValidationModule[errorHandler]: Unhandled error ${err.message}`))
  }
}
