import {
  DomainError,
} from './DomainError.js'
// 422

// TypeError
export class InvalidArgumentError extends DomainError {
  override type: string
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.type = 'InvalidArgumentError'
  }
}
