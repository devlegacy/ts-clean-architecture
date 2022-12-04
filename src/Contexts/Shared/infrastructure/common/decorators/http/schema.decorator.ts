import { FastifySchema } from 'fastify'
import HttpStatus from 'http-status'
import { JoiValidationGroup } from 'joi-class-decorators'

import { JoiModule } from '../../../joi'
import { ValidationModule } from '../../../platform-fastify'
import { ZodModule } from '../../../zod'
import { METHOD_METADATA, SCHEMA_METADATA } from '../../constants'
import { RequestMethod } from '../../enums'

type SchemaMethodGroup = { group: JoiValidationGroup } | undefined

export const getSchema = (
  schema: FastifySchema,
  group?: SchemaMethodGroup,
  // TODO: Get and build from other side
  schemasBuilders: ValidationModule<any>[] = [new JoiModule(), new ZodModule()]
): FastifySchema | undefined => {
  let invalidSchemasCounter = 0
  let shouldBreak = false

  const keys = Object.keys(schema) as (keyof FastifySchema)[]
  if (!keys.length) return undefined

  for (const key of keys) {
    shouldBreak = false
    for (const builder of schemasBuilders) {
      shouldBreak = builder.schemaBuilder(schema, key, group)
      if (shouldBreak) break
    }
    if (shouldBreak) continue

    // Sanitize
    delete schema[`${key}`]
    invalidSchemasCounter++
  }

  if (invalidSchemasCounter === keys.length) return undefined

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
    Reflect.defineMetadata(
      SCHEMA_METADATA,
      {
        schema,
        group: getMethodGroup(method),
        code
      },
      descriptor.value
    )

    return descriptor
  }
}
