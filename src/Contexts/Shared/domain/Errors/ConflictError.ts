import { DomainError } from './DomainError.js'

// 409 Conflict
export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
