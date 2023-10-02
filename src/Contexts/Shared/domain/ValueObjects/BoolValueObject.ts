import { InvalidArgumentError } from '../index.js'
import { ValueObject } from './ValueObject.js'

export abstract class BoolValueObject extends ValueObject<boolean> {
  constructor(value: boolean) {
    // this.value =
    super(value)
    this.#ensureIsValidBoolean(value)
  }

  #ensureIsValidBoolean(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new InvalidArgumentError(`<${this.constructor.name}> doesn't allow the value <${value}>`)
    }
  }
}
