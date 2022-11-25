import { v4 } from 'uuid'
import validate from 'uuid-validate'

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

  private isValid(id: string) {
    // if (!ObjectId.isValid(id)) {
    if (!validate(id)) throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${id}>`)
  }

  // Inherited
  // toString() {
  //   return this.value
  // }
}
