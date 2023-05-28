import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'

import { RequestMethod } from '@/Contexts/Shared/domain/Common'

import { HttpErrorHandler } from './HttpErrorHandler'

export interface HttpValidationModule<TSchema = unknown, TValidationResult = any> extends HttpErrorHandler {
  // Usado para construir los esquemas del request al construir el controlador en bootstrap | route loader, característica alternativa y fe retro-compatibilidad, debe eliminarse
  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, method: RequestMethod): void
  validationCompiler(schemaDefinition: FastifyRouteSchemaDef<TSchema>): TValidationResult
  errorHandler(error: FastifyError, req: FastifyRequest, res: FastifyReply): void
}
