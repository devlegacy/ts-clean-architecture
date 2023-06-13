import { InvalidArgumentError } from '../Errors'
import { NumberValueObject } from './NumberValueObject'

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
