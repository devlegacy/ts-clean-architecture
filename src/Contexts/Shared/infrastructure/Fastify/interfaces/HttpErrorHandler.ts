import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export interface HttpErrorHandler {
  errorHandler(error: FastifyError, req: FastifyRequest, res: FastifyReply): void
}
