import {
  DomainError,
} from './DomainError.js'

// 409 Conflict
export class ConflictError extends DomainError {
  override type = 'ConflictError'

  constructor(message: string) {
    super(message)
    // can't use because it can changes in minification
    // this.name = this.constructor.name
  }
}
