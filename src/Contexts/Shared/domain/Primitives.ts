import { InvariantOf, Writable } from 'type-fest'

import { Entity } from './Entity'
import { BoolValueObject, EnumValueObject, NumberValueObject, PrimitiveTypes, StringValueObject } from './value-object'

export type Primitives<Type> = Writable<{
  [Property in keyof Entity<Type>]: Type[Property] extends PrimitiveTypes
    ? Type[Property]
    : Type[Property] extends BoolValueObject
    ? boolean
    : InvariantOf<Type[Property]> extends NumberValueObject
    ? number
    : InvariantOf<Type[Property]> extends StringValueObject
    ? string
    : InvariantOf<Type[Property]> extends EnumValueObject<unknown>
    ? Primitives<NonNullable<Type[Property]>> extends { value: unknown }
      ? Pick<Primitives<NonNullable<Type[Property]>>, 'value'>['value']
      : string | number
    : Type[Property]
}>
