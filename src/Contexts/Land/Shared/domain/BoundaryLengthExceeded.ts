import {
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class BoundaryLengthExceeded extends InvalidArgumentError {
  constructor(value: string, limit: number) {
    super(`The course name <${value}> has more than ${limit} characters`)
    this.name = this.constructor.name
  }
}
