import { EnumValueObject, InvalidArgumentException } from '@/Contexts/Shared/domain'

export enum Type {
  FREE = 0,
  PREMIUM = 1
}

export class CourseType extends EnumValueObject<Type> {
  constructor(value: Type) {
    // NOTE: Se asume
    super(value, Object.values(Type) as Type[])
  }

  static fromValue(value: number): CourseType {
    switch (value) {
      case Type.FREE:
        return new CourseType(Type.FREE)
      case Type.PREMIUM:
        return new CourseType(Type.PREMIUM)
      default:
        throw new InvalidArgumentException(`The course type ${value} is invalid`)
    }
  }

  protected throwInvalidValueException(value: Type): void {
    throw new InvalidArgumentException(`The course type ${value} is invalid`)
  }
}
