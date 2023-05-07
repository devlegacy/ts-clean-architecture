import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'
import * as joi from 'joi'
import { getClassSchema, JoiValidationGroup } from 'joi-class-decorators'
import { Constructor, SCHEMA_PROTO_KEY } from 'joi-class-decorators/internal/defs'

import { isFunction } from '@/Contexts/Shared/domain'
import { HttpStatus, RequestMethod } from '@/Contexts/Shared/domain/Common'

import { HttpValidationModule } from '../../platform-fastify'

const defaultOptions: joi.ValidationOptions = {
  convert: true,
  cache: true,
  abortEarly: false,
  debug: true,
  nonEnumerables: true,
  stripUnknown: true,
  errors: {
    stack: true,
  },
}

type SchemaMethodGroup = { group: JoiValidationGroup } | undefined

export class JoiModule
  implements HttpValidationModule<joi.AnySchema, ((data: unknown) => joi.ValidationResult<any>) | void>
{
  validationCompiler({ schema }: FastifyRouteSchemaDef<joi.AnySchema>) {
    if (!joi.isSchema(schema)) return

    return (data: unknown) => {
      const validation = schema.validate(data, defaultOptions)
      return validation
    }
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    if (!(err instanceof joi.ValidationError)) return
    // Is JOI
    err.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
      error: HttpStatus[err.statusCode],
      statusCode: err.statusCode,
      message: err.message,
      path: req.raw.url,
      code: err.code,
      stack: err.stack,
      errors: this.format(err),
    })
  }

  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, method: RequestMethod) {
    if (!schema) return false
    const group = this.getMethodGroup(method)
    const objectSchema = schema[`${key}`] || {}
    if (joi.isSchema(objectSchema)) return true // Avoid transform if is already a Joi schema
    if (!this.isJoiSchema(objectSchema)) return false

    const buildSchema = getClassSchema(objectSchema as Constructor, group)
    if (!joi.isSchema(buildSchema)) return false

    schema[`${key}`] = buildSchema as any
    return true
  }

  private getMethodGroup(group: RequestMethod): SchemaMethodGroup {
    if (group === RequestMethod.POST) {
      return { group: 'CREATE' }
    } else if (group === RequestMethod.DELETE) {
      return { group: 'DELETE' }
    } else if ([RequestMethod.PUT, RequestMethod.PATCH].includes(group)) {
      return { group: 'UPDATE' }
    }
    return undefined
  }

  private isJoiSchema(objectSchema: unknown) {
    if (!isFunction(objectSchema)) return false
    const metadata = Reflect.getMetadataKeys(objectSchema.prototype)
    const isJoiSchema = Array.isArray(metadata) && metadata[0] === SCHEMA_PROTO_KEY
    return isJoiSchema
  }

  private format(validationError: joi.ValidationError) {
    const errors = new Map<string, Record<string, unknown>[]>()
    const details = validationError.details.reduce((errors, item: joi.ValidationErrorItem) => {
      const key = item?.context?.key
      if (!key) return errors
      if (!errors.has(key)) errors.set(key, [])
      const message = {
        message: item.message,
        field: key,
        type: item.type,
      }
      errors.get(key)?.push(message)

      return errors
    }, errors)
    const entries = Object.fromEntries(details)
    return entries
  }
}
