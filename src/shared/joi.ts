import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifyValidationResult } from 'fastify/types/schema'
import CreateHttpError from 'http-errors'
import HttpStatus from 'http-status'
import { ValidationError } from 'joi'
import * as joi from 'joi'
import { Types } from 'mongoose'
import { ZodError, ZodObject } from 'zod'

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

const options: Sentry.NodeOptions = {
  debug: true,
  environment: 'development',
  dsn: 'https://cc968649cee2411e91e10c5964fa75af@o914008.ingest.sentry.io/6667751',
  release: '',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Mongo({
      useMongoose: true // Default: false
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
}
Sentry.init(options)

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
      else if ((schema as any) instanceof ZodObject) return (schema as unknown as ZodObject<any>).parse(data)
      return true
    }
  }
  // TODO: Create as Fastify JOI Schema Error Formatter
  // this._app.setSchemaErrorFormatter((errors) => {
  //   this._app.log.error({ err: errors }, 'Validation failed')

  //   return new Error('Error!')
  // })

  // TODO: Create as Fastify JOI Schema Error Handler
  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    Sentry.setUser({
      ip_address: req.ip
    })
    Sentry.setTag('path', req.raw.url)
    Sentry.captureException(err)

    // Is JOI
    if (err instanceof ValidationError) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      return res.send(err)
      // Is HTTP
    } else if (err instanceof ZodError) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      return res.send(err.issues)
    } else if ((err as unknown as HttpError)?.code) {
      return res.send(CreateHttpError(err.code, err.message))
    }
    return res.status(500).send(new Error(`errorHandler: Unhandled error ${err.message}`))
  }
}

export { Joi, JoiModule }
