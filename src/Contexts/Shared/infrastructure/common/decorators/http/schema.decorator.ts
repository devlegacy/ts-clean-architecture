import { FastifySchema } from 'fastify'
import HttpStatus from 'http-status'

import { METHOD_METADATA, SCHEMA_METADATA } from '../../constants'

export const Schema = (schema: FastifySchema, code = HttpStatus.UNPROCESSABLE_ENTITY): MethodDecorator => {
  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const method = Reflect.getMetadata(METHOD_METADATA, descriptor.value)
    Reflect.defineMetadata(
      SCHEMA_METADATA,
      {
        schema,
        method,
        code
      },
      descriptor.value
    )

    return descriptor
  }
}
