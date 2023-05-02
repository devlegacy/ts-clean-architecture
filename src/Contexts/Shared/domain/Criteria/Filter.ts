import { InvalidArgumentError } from '../Errors'
import { FilterField } from './FilterField'
import { FilterOperator, FilterOperatorKeys } from './FilterOperator'
import { FilterValue } from './FilterValue'

export type FilterPrimitiveType = Primitives<Filter>
type FilterPrimitiveTypeKeys = keyof FilterPrimitiveType
export type FilterValueType = Map<FilterPrimitiveTypeKeys, string | number>

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: FilterValue

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromValues(values: FilterValueType): Filter {
    const field = values.get('field')
    const operator = values.get('operator')
    const value = values.get('value')

    if (!field || !operator || !value) {
      throw new InvalidArgumentError(`The filter <${field}> <${operator}> <${value}> is invalid`)
    }

    const filter = new Filter(
      new FilterField(field.toString()),
      // DEBT: Fix operator values and fromValues type
      FilterOperator.fromValue(operator as FilterOperatorKeys),
      new FilterValue(value)
    )

    return filter
  }

  static parse(params: FilterPrimitiveType[]): FilterValueType[] {
    if (!params) return new Array<FilterValueType>()

    const filters = params.map(({ field, value, operator }) => {
      const filter = new Map<FilterPrimitiveTypeKeys, string | number>([
        ['field', field],
        ['operator', operator],
        ['value', value],
      ])

      return filter
    })

    return filters
  }
}
