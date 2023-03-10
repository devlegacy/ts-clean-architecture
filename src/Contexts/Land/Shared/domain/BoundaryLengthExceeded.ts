import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class BoundaryLengthExceeded extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
