import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'
import HttpStatus from 'http-status'
import { ZodError, ZodObject } from 'zod'

import { HttpError } from '@/Contexts/Shared/domain'

import { HttpValidationModule } from '../../platform-fastify'
import { isZodDto } from '.'

// Inspired: https://github.com/risenforces/nestjs-zod/blob/main/src/dto.ts
export class ZodModule implements HttpValidationModule<ZodObject<any>> {
  validationCompiler({ schema }: FastifyRouteSchemaDef<ZodObject<any>>) {
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
    if (!(err instanceof ZodError)) return
    // Is Zod
    const statusCode = HttpStatus.UNPROCESSABLE_ENTITY
    const response = new HttpError({
      error: HttpStatus[+statusCode] ?? HttpStatus[422],
      statusCode,
      message: err.message,
      path: req.raw.url,
      code: err.code,
      stack: err.stack,
      errors: err.issues,
    })
    return res.status(statusCode).send(response)
  }

  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema) {
    const objectSchema = schema[`${key}`] || {}
    if (!isZodDto(objectSchema)) return
    schema[`${key}`] = objectSchema.schema
  }
}
