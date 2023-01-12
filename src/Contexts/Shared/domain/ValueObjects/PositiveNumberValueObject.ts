import { InvalidArgumentException } from '../Exceptions'
import { NumberValueObject } from './NumberValueObject'

export class PositiveNumberValueObject extends NumberValueObject {
  constructor(value: number) {
    super(value)
    this.isPositiveNumber(value)
  }

  private isPositiveNumber(value: number) {
    if (value < 0) {
      throw new InvalidArgumentException(`The value <${value}> must be a positive number`)
    }
  }
}
