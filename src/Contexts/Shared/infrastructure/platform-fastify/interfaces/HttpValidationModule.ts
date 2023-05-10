import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'

import { RequestMethod } from '@/Contexts/Shared/domain/Common'

export interface HttpValidationModule<TSchema = unknown, TValidationResult = any> {
  validationCompiler: (schemaDefinition: FastifyRouteSchemaDef<TSchema>) => TValidationResult
  errorHandler: (error: FastifyError, req: FastifyRequest, res: FastifyReply) => void
  // Usado para construir los esquemas del request al construir el controlador en bootstrap | route loader, característica alternativa y fe retro-compatibilidad, debe eliminarse
  schemaBuilder(schema: FastifySchema, method: RequestMethod): void
}
