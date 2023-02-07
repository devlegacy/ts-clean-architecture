import { CommandNotRegisteredError } from './Commands'
import { EntityNotFoundError, InvalidArgumentError } from './Errors'
import { QueryNotRegisteredError } from './Queries'

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
