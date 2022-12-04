import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef, FastifySchema } from 'fastify/types/schema'

export interface ValidationModule<T> {
  validationCompiler: (schemaDefinition: FastifyRouteSchemaDef<T>) => any
  errorHandler: (error: FastifyError, req: FastifyRequest, res: FastifyReply) => void
  // Usado para construir los esquemas del request al construir el controlador en bootstrap, fallback and retro-compatibilidad feature, debe eliminarse
  schemaBuilder(schema: FastifySchema, key: keyof FastifySchema, group?: any): boolean
}

export interface HttpError {
  code: number
}
