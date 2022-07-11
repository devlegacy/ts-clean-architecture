import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifyValidationResult } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'
import HttpStatus from 'http-status'
import { ValidationError } from 'joi'
import * as joi from 'joi'
import { Types } from 'mongoose'

import { HttpError } from '@/contexts/shared/infrastructure/http/http-error'

interface ExtendedStringSchema extends joi.StringSchema {
  objectId(): this
}

export interface ExtendedJoi extends joi.Root {
  string(): ExtendedStringSchema
}

export const stringObjectExtension: joi.Extension = {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.objectId': '{{#label}} must be a valid id'
  },
  rules: {
    objectId: {
      validate: (value: any, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error('string.objectId')
        }

        return value
      }
    }
  }
}

export const StringObjectExtension: ExtendedJoi = joi.extend(stringObjectExtension)

const Joi = joi.extend(stringObjectExtension) as ExtendedJoi

const validationOptions: joi.ValidationOptions = {
  cache: true,
  abortEarly: false,
  debug: true,
  nonEnumerables: true,
  stripUnknown: true
}

export interface ValidationModule {
  validationCompiler: (schemaDefinition: FastifyRouteSchemaDef<joi.AnySchema>) => FastifyValidationResult
  errorHandler: (error: FastifyError, req: FastifyRequest, res: FastifyReply) => void
}

class JoiModule implements ValidationModule {
  // TODO: Create as Fastify JOI validation Compiler
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<joi.AnySchema>): FastifyValidationResult {
    const { schema } = schemaDefinition

    return (data: unknown) => {
      if (joi.isSchema(schema)) return schema.validate(data, validationOptions)
      return true
    }
  }
  // TODO: Create as Fastify JOI Schema Error Formatter
  // this._app.setSchemaErrorFormatter((errors) => {
  //   this._app.log.error({ err: errors }, 'Validation failed')

  //   return new Error('Error!')
  // })

  // TODO: Create as Fastify JOI Schema Error Handler
  errorHandler(error: FastifyError, req: FastifyRequest, res: FastifyReply) {
    // Is JOI
    if (error instanceof ValidationError) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      return res.send(error)
      // Is HTTP
    } else if ((error as unknown as HttpError)?.code) {
      return res.send(CreateHttpError(error.code, error.message))
    }
    return res.status(500).send(new Error('Unhandled error'))
  }
}

export { Joi, JoiModule }
