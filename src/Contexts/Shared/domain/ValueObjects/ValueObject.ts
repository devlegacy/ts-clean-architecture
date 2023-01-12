import { shallowEqual } from 'fast-equals'

import { InvalidArgumentException } from '../Exceptions'

// eslint-disable-next-line @typescript-eslint/ban-types
export type PrimitiveTypes = String | string | number | Boolean | boolean | Date

/**
 * @description  A small immutable object whose equality is not based on identity but purely on its attributes.
 * `ValueObjects` are objects that we determine their equality through their structural property.
 *
 * ## Rules
 * - Value objects are immutable;
 * - Value objects can reference other objects;
 *
 * ## Notes:
 * - Value objects can/should hold validation for their data. When we have validation rules.
 */
export abstract class ValueObject<T extends PrimitiveTypes> {
  readonly value: T

  constructor(value: T) {
    this.value = Object.freeze(value)
    this.isValueDefined(value)
  }

  equals(vo: ValueObject<T>) {
    if (vo === null || vo === undefined) return false

    return shallowEqual(this.value, vo.value)
  }

  toString() {
    return this.value.toString()
  }

  private isValueDefined(value: T) {
    if (value === null || value === undefined) throw new InvalidArgumentException('Value must be defined')
  }
}
