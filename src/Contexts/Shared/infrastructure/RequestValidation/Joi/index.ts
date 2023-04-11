import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'
import HttpStatus from 'http-status'
import * as joi from 'joi'
import { DEFAULT, getClassSchema, JoiValidationGroup } from 'joi-class-decorators'
import { Constructor, SCHEMA_PROTO_KEY } from 'joi-class-decorators/internal/defs'
import { ObjectId } from 'mongodb'

import { RequestMethod } from '../../_Common'
import { ValidationModule } from '../../platform-fastify'

interface ExtendedStringSchema<T = string> extends joi.StringSchema<T> {
  objectId(): this
}

// interface ExtendedNumberSchema<T = number> extends joi.NumberSchema<T> {
//   coerceZero(): this
// }

interface ExtendedJoi extends joi.Root {
  string<T = string>(): ExtendedStringSchema<T>
  // number<T = number>(): ExtendedNumberSchema<T>
}

const stringObjectExtension: joi.Extension = {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.objectId': '{{#label}} must be a valid id',
  },
  rules: {
    objectId: {
      validate: (value: string, helpers) => {
        value = value.trim()
        if (!ObjectId.isValid(value)) {
          return helpers.error('string.objectId')
        }

        return value
      },
    },
  },
}

// const numberObjectExtension: joi.Extension = {
//   type: 'number',
//   base: joi.number(),
//   messages: {
//     'number.coerceZero': '{{#label}} must be a valid number'
//   },
//   rules: {
//     coerceZero: {
//       validate: (value: number) => {
//         if (Number.isNaN(value)) {
//           return 0
//         }

//         return value
//       }
//     }
//   }
// }

const validationOptions: joi.ValidationOptions = {
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

class JoiModule implements ValidationModule<joi.AnySchema> {
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<joi.AnySchema>) {
    const { schema } = schemaDefinition

    if (joi.isSchema(schema))
      return (data: unknown) => {
        return schema.validate(data, validationOptions)
      }
  }

  schemaErrorFormatter(validationError: joi.ValidationError) {
    const errors = new Map<string, Record<string, unknown>[]>()

    return Object.fromEntries(
      validationError.details.reduce((error: Map<string, Record<string, unknown>[]>, next: joi.ValidationErrorItem) => {
        const key = next?.context?.key

        if (!key) return errors

        if (!error.has(key)) error.set(key, [])

        error.get(key)?.push({
          message: next.message,
          field: key,
          type: next.type,
        })

        return error
      }, errors)
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
        errors: this.schemaErrorFormatter(err),
      })
    }
  }

  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, group?: SchemaMethodGroup) {
    const objectSchema = schema[`${key}`] || {}
    if (Joi.isSchema(objectSchema)) return true // Avoid transform if is already a Joi schema

    if (this.isSchemaJoiCandidate(objectSchema)) {
      const buildSchema = getClassSchema(objectSchema as Constructor, group)
      if (Joi.isSchema(buildSchema)) {
        schema[`${key}`] = buildSchema
        return true
      }
    }
    return false
  }

  getMethodGroup(group: RequestMethod): SchemaMethodGroup {
    if (group === RequestMethod.POST) {
      return { group: 'CREATE' }
    } else if ([RequestMethod.PUT, RequestMethod.PATCH].includes(group)) {
      return { group: 'UPDATE' }
    } else if (group === RequestMethod.DELETE) {
      return { group: 'DELETE' }
    }
    return undefined
  }

  isSchemaJoiCandidate(objectSchema: unknown) {
    return (
      typeof objectSchema === 'function' &&
      Array.isArray(Reflect.getMetadataKeys(objectSchema?.prototype)) &&
      Reflect.getMetadataKeys(objectSchema.prototype)[0] === SCHEMA_PROTO_KEY
    )
  }
}

export const JoiValidationGroups = {
  DEFAULT,
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
}

// Convenient & consistency export
export { DEFAULT }
export const { CREATE } = JoiValidationGroups
export const { UPDATE } = JoiValidationGroups

export const Joi = joi.extend(
  stringObjectExtension
  //  numberObjectExtension
) as ExtendedJoi
export { JoiModule }
