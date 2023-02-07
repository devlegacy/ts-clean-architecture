import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'
import HttpStatus from 'http-status'
import { ZodError, ZodObject, ZodSchema, ZodTypeDef } from 'zod'

import { ValidationModule } from '../../platform-fastify'

// Inspired: https://github.com/risenforces/nestjs-zod/blob/main/src/dto.ts

export class ZodModule implements ValidationModule<ZodObject<any>> {
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
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        error: HttpStatus[err.statusCode ?? HttpStatus.UNPROCESSABLE_ENTITY],
        statusCode: err.statusCode,
        message: err.message,
        path: req.raw.url,
        code: err.code,
        stack: err.stack,
        errors: err.issues,
      })
    }
  }

  getMethodGroup(_group?: any) {
    return undefined
  }

  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema) {
    const objectSchema = schema[`${key}`] || {}
    if ((objectSchema as any).isZodDto) {
      schema[`${key}`] = (objectSchema as any).schema
      return true
    }

    return false
  }
}

export interface ZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput> {
  isZodDto: true
  schema: ZodSchema<TOutput, TDef, TInput>
  new (): TOutput
  create(input: unknown): TOutput
}

export function createZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput>(
  schema: ZodSchema<TOutput, TDef, TInput>
) {
  class AugmentedZodDto {
    static isZodDto = true
    static schema = schema

    static create(input: unknown) {
      return this.schema.parse(input)
    }
  }

  return AugmentedZodDto as unknown as ZodDto<TOutput, TDef, TInput>
}

export function isZodDto(metatype: any): metatype is ZodDto<unknown> {
  return metatype?.isZodDto
}
