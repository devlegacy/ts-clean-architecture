import type {
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import type {
  FastifyRouteSchemaDef,
  FastifySchema,
} from 'fastify/types/schema.js'
import type {
  AnySchema,
  ValidationError,
  ValidationErrorItem,
  ValidationOptions,
  ValidationResult,
} from 'joi'
import joi from 'joi'
import {
  DEFAULT,
  getClassSchema,
} from 'joi-class-decorators'
import {
  type Constructor,
  type JoiValidationGroup,
  SCHEMA_PROTO_KEY,
} from 'joi-class-decorators/internal/defs.js'

import {
  HttpStatus,
  RequestMethod,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  HttpError,
  isFunction,
} from '#@/src/Contexts/Shared/domain/index.js'

import type {
  HttpValidationModule,
} from '../../Fastify/index.js'

const defaultOptions: ValidationOptions = {
  convert: true,
  cache: true,
  abortEarly: false,
  // debug: true, // cause conflict with Joi.when and joi-class-decorator
  nonEnumerables: true,
  stripUnknown: true,
  errors: {
    stack: true,
  },
}

export const JoiValidationGroups = {
  DEFAULT,
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
} as const

export class JoiModule implements HttpValidationModule<AnySchema, ((data: unknown) => ValidationResult<unknown>) | void> {
  validationCompiler({
    schema,
  }: FastifyRouteSchemaDef<AnySchema>) {
    if (!schema) return
    if (!joi.isSchema(schema)) return

    return (data: unknown) => {
      const validation = schema.validate(
        data,
        defaultOptions,
      )
      return validation
    }
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    if (!(err instanceof joi.ValidationError)) return
    // Is JOI
    const statusCode = HttpStatus.UNPROCESSABLE_ENTITY
    const response = new HttpError({
      error: HttpStatus[statusCode],
      statusCode,
      message: err.message,
      path: req.raw.url,
      code: err.code,
      stack: err.stack,
      errors: this.#format(err),
    })
    res.status(statusCode).send(response)
  }

  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, method: RequestMethod) {
    if (!schema) return

    const group = this.#getMethodGroup(method)
    const objectSchema = schema[`${key}`] || {}
    if (joi.isSchema(objectSchema)) return // Avoid transform if is already a Joi schema
    if (!this.#isJoiSchema(objectSchema)) return

    const joiSchema = getClassSchema(
      objectSchema,
      group,
    )
    if (!joi.isSchema(joiSchema)) return

    schema[`${key}`] = joiSchema satisfies unknown
  }

  #getMethodGroup(group: RequestMethod): { group: JoiValidationGroup } | undefined {
    if (group === RequestMethod.POST) {
      return {
        group: JoiValidationGroups.CREATE,
      } as const
    } else if (group === RequestMethod.DELETE) {
      return {
        group: 'DELETE',
      } as const
    } else if ([
      RequestMethod.PUT,
      RequestMethod.PATCH,
    ].includes(group)) {
      return {
        group: JoiValidationGroups.UPDATE,
      } as const
    }
    return undefined
  }

  #isJoiSchema(objectSchema: unknown): objectSchema is Constructor<unknown> {
    if (!isFunction(objectSchema)) return false
    const metadata = Reflect.getMetadataKeys(objectSchema.prototype)
    const isJoiSchema = Array.isArray(metadata) && metadata.at(0) === SCHEMA_PROTO_KEY

    return isJoiSchema
  }

  #format(validationError: ValidationError) {
    const errors = new Map<string, Record<string, unknown>[]>()
    const details = validationError.details.reduce(
      (errors, item: ValidationErrorItem) => {
        const key = item?.context?.key
        if (!key) return errors
        if (!errors.has(key)) errors.set(
          key,
          [],
        )
        const message = {
          message: item.message,
          field: key,
          type: item.type,
        }
        errors.get(key)?.push(message)

        return errors
      },
      errors,
    )
    const entries = Object.fromEntries(details)
    return entries
  }
}
