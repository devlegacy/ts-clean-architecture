import {
  InvalidArgumentError,
} from '../Errors/index.js'
import {
  NumberValueObject,
} from './NumberValueObject.js'

export class PositiveNumberValueObject extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.#ensurePositiveNumber(value)
  }

  #ensurePositiveNumber(value: number) {
    if (value < 0) {
      throw new InvalidArgumentError(`The value <${value}> must be a positive number`)
    }
  }
}
