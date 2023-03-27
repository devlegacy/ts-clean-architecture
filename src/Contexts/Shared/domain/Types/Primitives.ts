import { Simplify } from 'type-fest'

import { Entity } from './Entity'
import { Writable } from './Writable'

// eslint-disable-next-line @typescript-eslint/ban-types
type PrimitiveTypes = String | string | number | Boolean | boolean | Date | symbol | bigint | undefined

type ValueObjectValue<T> = T extends PrimitiveTypes
  ? T
  : T extends { value: infer U }
  ? U
  : T extends { value: infer U }[]
  ? U[]
  : T extends (infer U)[]
  ? ValueObjectValue<U>[]
  : T extends { [K in keyof Entity<T>]: unknown }
  ? { [K in keyof Entity<T>]: ValueObjectValue<T[K]> }
  : never

export type Primitives<Type> = Simplify<
  Writable<{
    [Property in keyof Entity<Type>]: ValueObjectValue<Type[Property]>
  }>
>

// export type Primitives<Type> = Writable<{
//   [Property in keyof Entity<Type>]: Type[Property] extends PrimitiveTypes
//     ? Type[Property]
//     : Type[Property] extends { value: unknown }[]
//     ? Pick<Type[Property][number], 'value'>['value'][]
//     : // eslint-disable-next-line @typescript-eslint/ban-types
//     Type[Property] extends Object[]
//     ? Primitives<Type[Property][number]>[]
//     : Type[Property] extends BoolValueObject
//     ? boolean
//     : InvariantOf<Type[Property]> extends NumberValueObject
//     ? number
//     : InvariantOf<Type[Property]> extends StringValueObject
//     ? string
//     : InvariantOf<Type[Property]> extends StringValueObject[]
//     ? string[]
//     : InvariantOf<Type[Property]> extends DateTime
//     ? Date
//     : InvariantOf<Type[Property]> extends EnumValueObject<unknown>
//     ? Primitives<NonNullable<Type[Property]>> extends { value: unknown }
//       ? Pick<Primitives<NonNullable<Type[Property]>>, 'value'>['value']
//       : string | number
//     : Type[Property] extends PrimitiveTypes | undefined
//     ? Type[Property]
//     : Primitives<NonNullable<Type[Property]>>
// }>
