import { InvalidArgumentError } from '../Errors'
import { EnumValueObject } from '../ValueObjects/EnumValueObject'

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  EXISTS = 'EXISTS',
}
export type FilterOperatorKeys = keyof typeof Operator

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator))
  }

  static fromValue(value: FilterOperatorKeys): FilterOperator
  static fromValue(value: string): FilterOperator
  static fromValue(value: FilterOperatorKeys): FilterOperator {
    return new FilterOperator(Operator[`${value}`])
  }

  static equal() {
    return new FilterOperator(Operator.EQUAL)
  }

  isPositive(): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
  }

  protected throwInvalidValueError(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator <${value}> is invalid`)
  }
}
