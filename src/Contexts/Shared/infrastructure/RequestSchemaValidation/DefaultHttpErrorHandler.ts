import { errorCodes, FastifyError, FastifyReply, FastifyRequest } from 'fastify'

import { EntityNotFoundError, HttpError, InvalidArgumentError } from '../../domain'
import { HttpStatus } from '../../domain/Common'
import { HttpValidationModule } from '../platform-fastify'

export class DefaultHttpErrorHandler implements HttpValidationModule<unknown> {
  // validationCompiler(_schemaDefinition: FastifyRouteSchemaDef<unknown>): void {
  validationCompiler(): void {
    // do nothing
  }

  errorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    let code: number | undefined
    if (err instanceof InvalidArgumentError) {
      code = HttpStatus.UNPROCESSABLE_ENTITY
    } else if (err instanceof EntityNotFoundError) {
      code = HttpStatus.NOT_FOUND
    } else if (
      err instanceof errorCodes.FST_ERR_BAD_STATUS_CODE ||
      err instanceof errorCodes.FST_ERR_CTP_EMPTY_JSON_BODY
    ) {
      code = err.statusCode
    }
    if (code) {
      const response = new HttpError({
        statusCode: code,
        error: HttpStatus[+code] ?? '',
        message: err.message,
        path: req.raw.url,
        code: err.code,
        stack: err.stack,
      })
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(response)
    }
  }

  // schemaBuilder(_schema: FastifySchema, _key: keyof FastifySchema, _method?: RequestMethod) {
  schemaBuilder() {
    // do nothing
  }
}
