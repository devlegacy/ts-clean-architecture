// Consideramos algoritmos infraestructura?
import {
  v4,
  validate,
  version,
} from 'uuid'

// import { ObjectId } from 'mongodb'
import {
  InvalidArgumentError,
} from '../Errors/index.js'
import {
  ValueObject,
} from './ValueObject.js'

// contener contaminación lo más que se pueda
// abstract
// Essence es un patrón de diseño creacional que también permite construir objetos complejos. Sin embargo, el patrón Essence se centra en la construcción de objetos que no tienen estado.
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
  // Builder, Factory pattern
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
