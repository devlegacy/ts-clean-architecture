import {
  DomainError,
} from './DomainError.js'

export class UnauthorizedError extends DomainError {
  override type: string
  constructor(message: string) {
    super(message)
    // this.name = this.constructor.name
    this.type = 'UnauthorizedError'
  }
}
