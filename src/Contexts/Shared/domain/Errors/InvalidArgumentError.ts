import {
  DomainError,
} from './DomainError.js'
// 422

// TypeError
export class InvalidArgumentError extends DomainError {
  override type = 'InvalidArgumentError'
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
