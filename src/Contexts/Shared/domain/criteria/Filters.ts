import { Filter, FilterPrimitiveDto } from './Filter'

export class Filters {
  readonly filters: Filter[]

  constructor(filters: Filter[]) {
    this.filters = filters
  }

  static parseFilters(params: FilterPrimitiveDto[]): Map<string, string>[] {
    if (!params) {
      return new Array<Map<string, string>>()
    }

    return params.map((filter) => {
      const { field, value, operator } = filter

      return new Map([
        ['field', field],
        ['operator', operator.toString()],
        ['value', value]
      ])
    })
  }

  static fromValues(filters: Map<string, string>[]): Filters {
    return new Filters(filters.map(Filter.fromValues))
  }

  static none(): Filters {
    return new Filters([])
  }
}
