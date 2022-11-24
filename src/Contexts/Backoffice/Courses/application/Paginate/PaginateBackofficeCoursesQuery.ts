import { Query } from '@/Contexts/Shared/domain'

export class PaginateBackofficeCoursesQuery extends Query {
  readonly filters: Map<string, string>[]
  readonly limit?: number
  readonly page?: number
  constructor(filters: Map<string, string>[], limit?: number, page?: number) {
    super()
    this.filters = filters
    this.limit = limit
    this.page = page
  }
}
