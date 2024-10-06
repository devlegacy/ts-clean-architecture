import {
  DomainError,
} from './DomainError.js'

// 404
export class EntityNotFoundError extends DomainError {
  override code = 'EntityNotFoundError'
  constructor(message: string) {
    super(message)
    // can't use because it can changes in minification
    // this.name = this.constructor.name
  }
}
