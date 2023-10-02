import { InvalidArgumentError } from '../index.js'
import { ValueObject } from './ValueObject.js'

export abstract class NumberValueObject extends ValueObject<number> {
  // readonly value: number

  constructor(value: number) {
    // this.value =
    super(value)
    this.#ensureIsValidNumber(value)
  }

  // sum() {}
  // increase() {}

  isBiggerThan(vo: NumberValueObject): boolean {
    return this.value > vo.value
  }

  #ensureIsValidNumber(value: number): void {
    if (typeof value !== 'number') {
      throw new InvalidArgumentError(`<${this.constructor.name}> doesn't allow the value <${value}>`)
    }
  }
}
