import { v4 as uuid } from 'uuid'
import validate from 'uuid-validate'

import { InvalidArgumentException } from '../exceptions'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {
  // readonly value: string

  constructor(value: string) {
    // this.ensureIsValidUuid(value)
    // this.value = value
    super(value)
    this.ensureIsValidUuid(value)
  }

  static random(): Uuid {
    return new Uuid(uuid())
  }

  private ensureIsValidUuid(id: string) {
    if (!validate(id)) {
      throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }

  // toString() {
  //   return this.value
  // }
}
