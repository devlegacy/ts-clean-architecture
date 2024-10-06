import {
  DomainError,
} from './DomainError.js'
// 422

// TypeError
export class InvalidArgumentError extends DomainError {
  override code = 'InvalidArgumentError'
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
