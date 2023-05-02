import { InvalidArgumentError } from '../Errors'
import { EnumValueObject } from '../ValueObjects'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export type OrderTypeKeys = keyof typeof OrderTypes

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes))
  }

  static fromValue(value: OrderTypeKeys | Lowercase<OrderTypeKeys>): OrderType
  static fromValue(value: string): OrderType
  static fromValue(value: OrderTypeKeys | Lowercase<OrderTypeKeys>): OrderType {
    return new OrderType(OrderTypes[`${value}`.toUpperCase() as OrderTypeKeys])
  }

  isNone(): boolean {
    return this.value === OrderTypes.NONE
  }

  isAsc(): boolean {
    return this.value === OrderTypes.ASC
  }

  protected throwInvalidValueError(value: OrderTypes): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`)
  }
}
