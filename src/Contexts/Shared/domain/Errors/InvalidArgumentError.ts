import {
  DomainError,
} from './DomainError.js'
// 422

// TypeError
export class InvalidArgumentError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
