import { v4, validate, version } from 'uuid'

// import { ObjectId } from 'mongodb'
import { InvalidArgumentException } from '../exceptions'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {
  // Inherited
  // readonly value: string

  constructor(value: string) {
    // this.isValid(value)
    // this.value = value
    super(value)
    this.isValid(value)
  }

  // Debería devolver valores en string
  static random(): Uuid {
    // return new Uuid(new ObjectId().toString())
    return new Uuid(v4())
  }

  private isValid(value: string) {
    // if (!ObjectId.isValid(id)) {
    if (!(validate(value) || version(value) === 4))
      throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${value}>`)
  }

  // Inherited
  // toString() {
  //   return this.value
  // }
}
