import {
  DomainError,
} from './DomainError.js'

export class UnauthorizedError extends DomainError {
  override code = 'UnauthorizedError'
  constructor(message: string) {
    super(message)
    // this.name = this.constructor.name
  }
}
