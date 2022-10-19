// import * as Sentry from '@sentry/node'
// import * as Tracing from '@sentry/tracing'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'
import HttpStatus from 'http-status'
import { ValidationError } from 'joi'
import * as joi from 'joi'
import { DEFAULT } from 'joi-class-decorators'
import { ObjectId } from 'mongodb'
import { ZodError, ZodObject } from 'zod'

import { HttpError } from '../http/http-error'

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

// const options: Sentry.NodeOptions = {
//   debug: true,
//   environment: 'development',
//   dsn: 'https://cc968649cee2411e91e10c5964fa75af@o914008.ingest.sentry.io/6667751',
//   release: '',
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Mongo({
//       useMongoose: true // Default: false
//     })
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0
// }

// Sentry.init(options)

export interface ValidationModule<T> {
  validationCompiler: (schemaDefinition: FastifyRouteSchemaDef<T>) => any
  errorHandler: (error: FastifyError, req: FastifyRequest, res: FastifyReply) => void
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
    // Sentry.setUser({
    //   ip_address: req.ip
    // })
    // Sentry.setTag('path', req.raw.url)
    // Sentry.captureException(err)

    // Is JOI
    if (err instanceof ValidationError) {
      err.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err)
    }
  }
}

class ZodModule implements ValidationModule<ZodObject<any>> {
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
export { GeneralValidationModule, JoiModule, ZodModule }
