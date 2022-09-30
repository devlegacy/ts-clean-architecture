import { NumberValueObject } from './value-object/NumberValueObject'
import { StringValueObject } from './value-object/StringValueObject'
import { Primitives } from './value-object/ValueObject'

export type PrimitiveProperties<Type> = {
  [Property in keyof Type]: Type[Property] extends Primitives
    ? Type[Property]
    : // : Type[Property] extends BoolValueObject
    // ? boolean
    Type[Property] extends NumberValueObject
    ? number
    : Type[Property] extends StringValueObject
    ? string
    : Type[Property]
}
