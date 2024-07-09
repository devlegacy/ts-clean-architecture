import {
  CommandNotRegisteredError,
} from './Commands/index.js'
import {
  HttpStatus,
} from './Common/index.js'
import {
  DomainError,
  EntityNotFoundError,
  InvalidArgumentError,
} from './Errors/index.js'
import {
  QueryNotRegisteredError,
} from './Queries/index.js'

export class DomainErrorHandler extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  static isDomainError(e: unknown) {
    return (
      e instanceof DomainError
      || e instanceof DomainErrorHandler
      || e instanceof InvalidArgumentError
      || e instanceof EntityNotFoundError
      || e instanceof CommandNotRegisteredError
      || e instanceof QueryNotRegisteredError
    )
  }

  static toHttpCode(e: unknown) {
    if (
      e instanceof EntityNotFoundError
      || e instanceof CommandNotRegisteredError
      || e instanceof QueryNotRegisteredError
    ) {
      return HttpStatus.NOT_FOUND
    } else if (e instanceof InvalidArgumentError || e instanceof DomainError) {
      return HttpStatus.UNPROCESSABLE_ENTITY
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}
