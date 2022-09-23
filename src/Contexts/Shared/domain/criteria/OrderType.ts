import { InvalidArgumentException } from '../exceptions'
import { EnumValueObject } from '../value-object/EnumValueObject'

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
        throw new InvalidArgumentException(`The order type ${value} is invalid`)
    }
  }

  isNone(): boolean {
    return this.value === OrderTypes.NONE
  }

  isAsc(): boolean {
    return this.value === OrderTypes.ASC
  }

  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new InvalidArgumentException(`The order type ${value} is invalid`)
  }
}
