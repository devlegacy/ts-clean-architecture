import { EnumValueObject } from '../value-object/enum-value-object'
import { InvalidArgumentError } from '../value-object/invalid-argument.error'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes))
  }

  static fromValue(value: string): OrderType {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC)
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC)
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`)
    }
  }

  isNone(): boolean {
    return this.value === OrderTypes.NONE
  }

  isAsc(): boolean {
    return this.value === OrderTypes.ASC
  }

  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`)
  }
}
