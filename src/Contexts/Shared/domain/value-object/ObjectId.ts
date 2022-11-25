// import { v4 } from 'uuid'
// import validate from 'uuid-validate'

import { ObjectId as ObjectID } from 'mongodb'

import { InvalidArgumentException } from '../exceptions'
import { ValueObject } from './ValueObject'

export class ObjectId extends ValueObject<string> {
  // Inherited
  // readonly value: string

  constructor(value: string) {
    // this.isValid(value)
    // this.value = value
    super(value)
    this.isValid(value)
  }

  // Debería devolver valores en string
  static random(): ObjectId {
    return new ObjectId(new ObjectID().toString())
    // return new Uuid(v4())
  }

  private isValid(id: string) {
    // if (!validate(id)) {
    if (!ObjectID.isValid(id)) {
      throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }

  // Inherited
  // toString() {
  //   return this.value
  // }
}
