import { InvariantOf, Writable } from 'type-fest'

import { Entity } from './Entity'
import { EnumValueObject, NumberValueObject, PrimitiveTypes, StringValueObject } from './value-object'

export type Primitives<Type> = Entity<
  Writable<{
    [Property in keyof Type]: Type[Property] extends PrimitiveTypes
      ? Type[Property]
      : // : Type[Property] extends BoolValueObject
      // ? boolean
      InvariantOf<Type[Property]> extends NumberValueObject
      ? number
      : InvariantOf<Type[Property]> extends StringValueObject
      ? string
      : InvariantOf<Type[Property]> extends EnumValueObject<unknown>
      ? string | number
      : Type[Property]
  }>
>
