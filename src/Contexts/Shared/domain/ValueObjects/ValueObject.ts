import { shallowEqual } from 'fast-equals'

import { InvalidArgumentError } from '../Errors'

// // eslint-disable-next-line @typescript-eslint/ban-types
// export type PrimitiveTypes = String | string | number | Boolean | boolean | Date | symbol | bigint

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
export abstract class ValueObject<T extends Exclude<PrimitiveTypes, undefined>> {
  readonly value: T

  constructor(value: T) {
    this.value = Object.freeze(value)
    this.ensureValueIsDefined(value)
  }

  equals(vo: ValueObject<T>) {
    if (vo === null || vo === undefined) return false

    return vo.constructor.name === this.constructor.name && shallowEqual(this.value, vo.value)
  }

  toString() {
    return this.value.toString()
  }

  private ensureValueIsDefined(value: T) {
    if (value === null || value === undefined) throw new InvalidArgumentError('Value must be defined')
  }
}
