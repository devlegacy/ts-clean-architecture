import { InvalidArgumentException } from '../exceptions'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Primitives = String | string | number | Boolean | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  readonly value: T

  constructor(value: T) {
    this.value = value
    this.isValueDefined(value)
  }

  equals(value: ValueObject<T>): boolean {
    return value.constructor.name === this.constructor.name && value.value === this.value
  }

  toString() {
    return this.value.toString()
  }

  private isValueDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentException('Value must be defined')
    }
  }
}
