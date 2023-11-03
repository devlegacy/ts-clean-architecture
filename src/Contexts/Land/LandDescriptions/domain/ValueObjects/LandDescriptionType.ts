import { EnumValueObject, InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

export enum Type {
  BLOCK = 0,
  LOT,
}
export type TypeKeys = keyof typeof Type
// export type TypeValues = Type

export class LandDescriptionType extends EnumValueObject<Type> {
  constructor(value: Type) {
    super(value, Object.values<number>(Type as { [Key in TypeKeys]: number }))
  }

  static fromValue(value: TypeKeys | Type): LandDescriptionType {
    const key = (typeof value === 'number' ? Type[`${value}`] : value) as TypeKeys
    return new LandDescriptionType(Type[`${key}`])
  }

  protected throwInvalidValueError(value: Type): void {
    throw new InvalidArgumentError(`The description type ${value} is invalid`)
  }
}
