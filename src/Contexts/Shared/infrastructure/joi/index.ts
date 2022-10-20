import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'
import HttpStatus from 'http-status'
import { ValidationError } from 'joi'
import * as joi from 'joi'
import { DEFAULT } from 'joi-class-decorators'
import { ObjectId } from 'mongodb'

import { HttpError, ValidationModule } from '../platform-fastify'

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
  stripUnknown: true
}

class JoiModule implements ValidationModule<joi.AnySchema> {
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<joi.AnySchema>) {
    const { schema } = schemaDefinition

    if (joi.isSchema(schema))
      return (data: unknown) => {
        return schema.validate(data, validationOptions)
      }
  }

  // TODO: Create as Fastify JOI Schema Error Formatter
  // this._app.setSchemaErrorFormatter((errors) => {
  //   this._app.log.error({ err: errors }, 'Validation failed')

  //   return new Error('Error!')
  // })

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is JOI
    if (err instanceof ValidationError) {
      err.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err)
    }
  }
}

class GeneralValidationModule implements ValidationModule<unknown> {
  validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): any {
    //
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is our HTTP
    if ((err as unknown as HttpError)?.code) {
      return res.send(CreateHttpError(err.code, err.message))
    } else if (!res.sent) {
      // TODO: Improve general error handler to catch unknown errors
      return res.status(500).send(new Error(`GeneralValidationModule[errorHandler]: Unhandled error ${err.message}`))
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
export { GeneralValidationModule, JoiModule }
