import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'
import HttpStatus from 'http-status'
import { ZodError, ZodObject } from 'zod'

import { ValidationModule } from '../platform-fastify'

export class ZodModule implements ValidationModule<ZodObject<any>> {
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<ZodObject<any>>) {
    const { schema } = schemaDefinition

    if (schema instanceof ZodObject)
      return (data: unknown) => {
        return schema.parse(data)
      }
  }

  // TODO: Create as Fastify JOI Schema Error Formatter
  // this._app.setSchemaErrorFormatter((errors) => {
  //   this._app.log.error({ err: errors }, 'Validation failed')

  //   return new Error('Error!')
  // })

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is Zod
    if (err instanceof ZodError) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      return res.send(err.issues)
    }
  }
}
