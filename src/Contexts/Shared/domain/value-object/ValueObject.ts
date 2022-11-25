import { shallowEqual } from 'fast-equals'

import { InvalidArgumentException } from '../exceptions'

// eslint-disable-next-line @typescript-eslint/ban-types
export type PrimitiveTypes = String | string | number | Boolean | boolean | Date

export abstract class ValueObject<T extends PrimitiveTypes> {
  readonly value: T

  constructor(value: T) {
    this.value = Object.freeze(value)
    this.isValueDefined(value)
  }

  equals(vo: ValueObject<T>): boolean {
    if (vo.value === undefined) return false

    return shallowEqual(this.value, vo.value)
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
