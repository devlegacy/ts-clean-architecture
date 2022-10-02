import { InvariantOf, Writable } from 'type-fest'

import { NumberValueObject } from './value-object/NumberValueObject'
import { StringValueObject } from './value-object/StringValueObject'
import { Primitives } from './value-object/ValueObject'

export type PrimitiveProperties<Type> = Writable<{
  [Property in keyof Type]: Type[Property] extends Primitives
    ? Type[Property]
    : // : Type[Property] extends BoolValueObject
    // ? boolean
    InvariantOf<Type[Property]> extends NumberValueObject
    ? number
    : InvariantOf<Type[Property]> extends StringValueObject
    ? string
    : Type[Property]
}>
