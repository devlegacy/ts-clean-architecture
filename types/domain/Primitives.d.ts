// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
type PrimitiveTypes = String | string | number | Boolean | boolean | Date | symbol | bigint | undefined | null

// type ValueObjectValue<T> = T extends PrimitiveTypes
// ? T
// : T extends { value: infer U }
// ? U extends unknown[]
//   ? Primitives<U[number]>[]
//   : U
// : T extends { value: infer U }[]
// ? U[]
// : T extends (infer U)[]
// ? ValueObjectValue<U>[]
// : T extends { [K in keyof Entity<T>]: unknown }
// ? { [K in keyof Entity<T>]: ValueObjectValue<T[K]> }
// : never

type ValueObjectValue<T> = T extends PrimitiveTypes
  ? T
  : T extends { value: infer U }
    ? U
    : T extends { value: infer U }[]
      ? U[]
      : T extends (infer U)[]
        ? ValueObjectValue<U>[]
        :
        // eslint-disable-next-line unused-imports/no-unused-vars
        T extends { [K in keyof Entity<T>]: infer U }
          ? { [K in keyof Entity<T>]: ValueObjectValue<Entity<T>[K]> }
          : never

type Primitives<Type> = Simplify<
  Writable<{
    [Property in keyof Entity<Type>]: ValueObjectValue<Type[Property]>
  }>
>
// Note: Export allows to keep an scope and doesn't export any other utility type

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
