import { METHOD_METADATA, SCHEMA_METADATA } from '../../constants'
import { HttpStatus } from '../../enums'

type SchemaType = {
  body?: unknown
  querystring?: unknown
  params?: unknown
  headers?: unknown
  response?: unknown
}

export const Schema = (schema: SchemaType, code = HttpStatus.UNPROCESSABLE_ENTITY): MethodDecorator => {
  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const method = Reflect.getMetadata(METHOD_METADATA, descriptor.value)
    Reflect.defineMetadata(
      SCHEMA_METADATA,
      {
        schema,
        method,
        code,
      },
      descriptor.value
    )

    return descriptor
  }
}
