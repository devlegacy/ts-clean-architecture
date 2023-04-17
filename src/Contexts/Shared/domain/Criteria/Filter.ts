import { InvalidArgumentError } from '../Errors'
import { Primitives } from '../Types/Primitives'
import { FilterField } from './FilterField'
import { FilterOperator, OperatorKeys } from './FilterOperator'
import { FilterValue } from './FilterValue'

export type FilterPrimitiveDto = Primitives<Filter>

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: FilterValue

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromValues(values: Map<string, string>): Filter {
    const field = values.get('field')
    const operator = values.get('operator')
    const value = values.get('value')

    if (!field || !operator || !value) {
      throw new InvalidArgumentError(`The filter <${field}> <${operator}> <${value}> is invalid`)
    }

    const filter = new Filter(
      new FilterField(field),
      // DEBT: Fix operator values and fromValues type
      FilterOperator.fromValue(operator as OperatorKeys),
      new FilterValue(value)
    )

    return filter
  }

  static parseFilters(params: FilterPrimitiveDto[]): Map<string, string>[] {
    if (!params) {
      return new Array<Map<string, string>>()
    }

    const filters = params.map(({ field, value, operator }) => {
      const filter = new Map([
        ['field', field],
        ['operator', operator.toString()],
        ['value', value],
      ])

      return filter
    })

    return filters
  }
}
