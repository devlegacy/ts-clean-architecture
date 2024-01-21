import { type FilterValueType, Query } from '@/Contexts/Shared/domain/index.js'

export class GetPaginatedBackofficeCoursesQuery extends Query {
  // readonly filters: Map<string, string>[]
  // readonly limit?: number
  // readonly page?: number
  constructor(
    readonly filters: FilterValueType[],
    readonly limit?: number,
    readonly page?: number,
  ) {
    super()
    // this.filters = filters
    // this.limit = limit
    // this.page = page
  }
}
