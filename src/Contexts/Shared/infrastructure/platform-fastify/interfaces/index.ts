import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyRouteSchemaDef } from 'fastify/types/schema'

export interface ValidationModule<T> {
  validationCompiler: (schemaDefinition: FastifyRouteSchemaDef<T>) => any
  errorHandler: (error: FastifyError, req: FastifyRequest, res: FastifyReply) => void
}

export interface HttpError {
  code: number
}
