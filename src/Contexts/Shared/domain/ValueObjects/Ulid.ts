import { isValid, ulid } from 'ulidx'

import { InvalidArgumentError } from '../Errors/index.js'
import { ValueObject } from './ValueObject.js'

export class Ulid extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.#ensureIsValidUlid(value)
  }

  static random(): Ulid {
    return new Ulid(ulid())
  }

  #ensureIsValidUlid(value: string): void {
    if (!isValid(value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> doesn't allow the value <${value}>`)
    }
  }
}

// console.log(Ulid.random().value)
// console.log(Ulid.random().value)
// console.log(Ulid.random().value)
