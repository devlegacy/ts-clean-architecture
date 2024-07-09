// Consideramos algoritmos infraestructura?
import {
  ObjectId as ObjectID,
} from 'mongodb'

import {
  InvalidArgumentError,
} from '../Errors/index.js'
import {
  ValueObject,
} from './ValueObject.js'

// contener contaminación lo más que se pueda
export class ObjectId extends ValueObject<string> {
  // Inherited
  // readonly value: string

  constructor(value: string) {
    // this.isValid(value)
    // this.value = value
    super(value)
    this.#isValidObjectId(value)
  }

  // Debería devolver valores en string
  static random(): ObjectId {
    return new ObjectId(new ObjectID().toString())
    // return new Uuid(v4())
  }

  #isValidObjectId(id: string) {
    // if (!validate(id)) {
    if (!ObjectID.isValid(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }

  // Inherited
  // toString() {
  //   return this.value
  // }
}
