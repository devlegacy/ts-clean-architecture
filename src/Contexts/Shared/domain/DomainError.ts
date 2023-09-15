import { CommandNotRegisteredError } from './Commands/index.js'
import { EntityNotFoundError, InvalidArgumentError } from './Errors/index.js'
import { QueryNotRegisteredError } from './Queries/index.js'

export class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  static isKnownError(e: unknown) {
    return (
      e instanceof DomainError ||
      e instanceof InvalidArgumentError ||
      e instanceof EntityNotFoundError ||
      e instanceof CommandNotRegisteredError ||
      e instanceof QueryNotRegisteredError
    )
  }
}
