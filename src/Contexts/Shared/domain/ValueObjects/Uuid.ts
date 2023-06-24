// Consideramos algoritmos infraestructura?
import { v4, validate, version } from 'uuid'

// import { ObjectId } from 'mongodb'
import { InvalidArgumentError } from '../Errors'
import { ValueObject } from './ValueObject'

// contener contaminación lo más que se pueda
// abstract
export class Uuid extends ValueObject<string> {
  // Inherited
  // readonly value: string

  constructor(value: string) {
    // this.isValid(value)
    // this.value = value
    super(value)
    this.#ensureIsValidUuid(value)
  }

  // Debería devolver valores en string
  static random(): Uuid {
    // return new Uuid(new ObjectId().toString())
    return new Uuid(v4())
  }

  // void -> efecto colateral
  // clausula de guarda
  // early return
  #ensureIsValidUuid(value: string): void {
    // if (!ObjectId.isValid(id)) {
    if (!(validate(value) || version(value) === 4)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> doesn't allow the value <${value}>`)
    }
  }

  // Inherited
  // toString() {
  //   return this.value
  // }
}
