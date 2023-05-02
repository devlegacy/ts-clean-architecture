import { Filter, FilterValueType } from './Filter'

export class Filters {
  readonly filters: Filter[]

  constructor(filters: Filter[]) {
    this.filters = filters
  }

  static fromValues(filters: FilterValueType[]): Filters {
    return new Filters(filters.map((filter) => Filter.fromValues(filter)))
  }

  static none(): Filters {
    return new Filters([])
  }
}
