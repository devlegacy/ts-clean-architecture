import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema.js'

import { RequestMethod } from '@/Contexts/Shared/domain/Common/index.js'

import type { HttpErrorHandler } from './HttpErrorHandler.js'

export interface HttpValidationModule<TSchema = unknown, TValidationResult = any> extends HttpErrorHandler {
  // Usado para construir los esquemas del request al construir el controlador en bootstrap | route loader, característica alternativa y de retro-compatibilidad, debe eliminarse
  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, method: RequestMethod): void
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<TSchema>): TValidationResult
  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply): void
}
