import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'
import HttpStatus from 'http-status'
import * as joi from 'joi'
import { DEFAULT } from 'joi-class-decorators'
import { ObjectId } from 'mongodb'

import { ValidationModule } from '../platform-fastify'

interface ExtendedStringSchema<T = string> extends joi.StringSchema<T> {
  objectId(): this
}

interface ExtendedJoi extends joi.Root {
  string<T = string>(): ExtendedStringSchema<T>
}

const stringObjectExtension: joi.Extension = {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.objectId': '{{#label}} must be a valid id'
  },
  rules: {
    objectId: {
      validate: (value: string, helpers) => {
        value = value.trim()
        if (!ObjectId.isValid(value)) {
          return helpers.error('string.objectId')
        }

        return value
      }
    }
  }
}

const validationOptions: joi.ValidationOptions = {
  cache: true,
  abortEarly: false,
  debug: true,
  nonEnumerables: true,
  stripUnknown: true,
  errors: {
    stack: true
  }
}

class JoiModule implements ValidationModule<joi.AnySchema> {
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<joi.AnySchema>) {
    const { schema } = schemaDefinition

    if (joi.isSchema(schema))
      return (data: unknown) => {
        return schema.validate(data, validationOptions)
      }
  }

  schemaErrorFormatter(validationError: joi.ValidationError) {
    const errors = new Map<string, Array<Record<string, unknown>>>()

    return Object.fromEntries(
      validationError.details.reduce(
        (error: Map<string, Array<Record<string, unknown>>>, next: joi.ValidationErrorItem) => {
          const key = next?.context?.key

          if (!key) return errors

          if (!error.has(key)) error.set(key, [])

          error.get(key)?.push({
            message: next.message,
            field: key,
            type: next.type
          })

          return error
        },
        errors
      )
    )
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is JOI
    if (err instanceof joi.ValidationError) {
      err.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        error: HttpStatus[err.statusCode],
        statusCode: err.statusCode,
        message: err.message,
        path: req.raw.url,
        code: err.code,
        stack: err.stack,
        errors: this.schemaErrorFormatter(err)
      })
    }
  }
}

export const JoiValidationGroups = {
  DEFAULT,
  CREATE: Symbol('CREATE'),
  UPDATE: Symbol('UPDATE')
}

// Convenient & consistency export
export { DEFAULT }
export const { CREATE } = JoiValidationGroups
export const { UPDATE } = JoiValidationGroups

export const Joi = joi.extend(stringObjectExtension) as ExtendedJoi
export { JoiModule }
