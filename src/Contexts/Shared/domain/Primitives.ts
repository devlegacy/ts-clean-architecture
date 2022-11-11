import { InvariantOf, Writable } from 'type-fest'

import { NonFunctionProperties } from './NonFunctionProperties'
import { EnumValueObject } from './value-object'
import { NumberValueObject } from './value-object/NumberValueObject'
import { StringValueObject } from './value-object/StringValueObject'
import { PrimitiveTypes } from './value-object/ValueObject'

export type Primitives<Type> = NonFunctionProperties<
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
