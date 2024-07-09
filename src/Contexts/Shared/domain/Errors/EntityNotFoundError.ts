import {
  DomainError,
} from './DomainError.js'

// 404
export class EntityNotFoundError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
