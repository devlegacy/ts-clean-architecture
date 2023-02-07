import { InvariantOf, Writable } from 'type-fest'

import { Entity } from './Entity'
import {
  BoolValueObject,
  DateTime,
  EnumValueObject,
  NumberValueObject,
  PrimitiveTypes,
  StringValueObject,
} from './ValueObjects'

export type Primitives<Type> = Writable<{
  [Property in keyof Entity<Type>]: Type[Property] extends PrimitiveTypes
    ? Type[Property]
    : Type[Property] extends { value: unknown }[]
    ? Pick<Type[Property][number], 'value'>['value'][]
    : // eslint-disable-next-line @typescript-eslint/ban-types
    Type[Property] extends Object[]
    ? Primitives<Type[Property][number]>[]
    : Type[Property] extends BoolValueObject
    ? boolean
    : InvariantOf<Type[Property]> extends NumberValueObject
    ? number
    : InvariantOf<Type[Property]> extends StringValueObject
    ? string
    : InvariantOf<Type[Property]> extends DateTime
    ? Date
    : InvariantOf<Type[Property]> extends EnumValueObject<unknown>
    ? Primitives<NonNullable<Type[Property]>> extends { value: unknown }
      ? Pick<Primitives<NonNullable<Type[Property]>>, 'value'>['value']
      : string | number
    : Type[Property]
}>
