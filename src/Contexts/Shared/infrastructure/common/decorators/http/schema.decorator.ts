import { FastifySchema } from 'fastify'
import HttpStatus from 'http-status'
import Joi from 'joi'
import { getClassSchema, JoiValidationGroup } from 'joi-class-decorators'
import { Constructor, SCHEMA_PROTO_KEY } from 'joi-class-decorators/internal/defs'

import { METHOD_METADATA, SCHEMA_METADATA } from '../../constants'
import { RequestMethod } from '../../enums'

type SchemaMethodGroup = { group: JoiValidationGroup } | undefined

const isSchemaJoiCandidate = (objectSchema: unknown) =>
  typeof objectSchema === 'function' &&
  Array.isArray(Reflect.getMetadataKeys(objectSchema?.prototype)) &&
  Reflect.getMetadataKeys(objectSchema.prototype)[0] === SCHEMA_PROTO_KEY

export const getSchema = (schema: FastifySchema, group?: SchemaMethodGroup): FastifySchema | undefined => {
  let invalidSchemas = 0
  const keys = Object.keys(schema) as (keyof FastifySchema)[]
  if (!keys.length) return undefined

  for (const key of keys) {
    const objectSchema = schema[key] || {}
    if (Joi.isSchema(objectSchema)) continue // Avoid transform if is already a joi schema

    if (isSchemaJoiCandidate(objectSchema)) {
      const buildSchema = getClassSchema(objectSchema as Constructor, group)
      if (Joi.isSchema(buildSchema)) {
        schema[key] = buildSchema
        continue
      }
    } else if ((objectSchema as any).isZodDto) {
      schema[key] = (objectSchema as any).schema
      continue
    }

    // Sanitize
    delete schema[key]
    invalidSchemas++
  }

  if (invalidSchemas === keys.length) return undefined

  return schema
}

export const getMethodGroup = (group: RequestMethod): SchemaMethodGroup => {
  if (group === RequestMethod.POST) {
    return { group: 'CREATE' }
  } else if ([RequestMethod.PUT, RequestMethod.PATCH].includes(group)) {
    return { group: 'UPDATE' }
  } else if (group === RequestMethod.DELETE) {
    return { group: 'DELETE' }
  }
  return undefined
}

export const Schema = (schema: FastifySchema, code = HttpStatus.UNPROCESSABLE_ENTITY): MethodDecorator => {
  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const method = Reflect.getMetadata(METHOD_METADATA, descriptor.value)

    const schemaBuilded = getSchema(schema, getMethodGroup(method))

    if (!schemaBuilded) return descriptor

    Reflect.defineMetadata(
      SCHEMA_METADATA,
      {
        schema: schemaBuilded,
        code
      },
      descriptor.value
    )

    return descriptor
  }
}
