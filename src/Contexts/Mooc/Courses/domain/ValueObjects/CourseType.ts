import {
  EnumValueObject,
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'

export enum Type {
  FREE = 0,
  PREMIUM = 1
}

export class CourseType extends EnumValueObject<Type> {
  constructor(value: Type) {
    // NOTE: Se asume casting de datos
    // Object.values(Type).filter((t) => !isNaN(t as number)) as Type[]
    super(
      value,
      Object.values(Type) as Type[],
    )
  }

  static fromValue(value: string | number): CourseType {
    switch (value) {
      case Type.FREE:
        return new CourseType(Type.FREE)
      case Type.PREMIUM:
        return new CourseType(Type.PREMIUM)
      case 'PREMIUM':
        return new CourseType(Type['PREMIUM'])
      case 'FREE':
        return new CourseType(Type['FREE'])
      default:
        throw new InvalidArgumentError(`The course type <${value}> is invalid`)
    }
  }

  protected throwInvalidValueError(value: Type): void {
    throw new InvalidArgumentError(`The course type ${value} is invalid`)
  }
}
