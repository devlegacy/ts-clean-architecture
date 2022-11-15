import { Query } from '@/Contexts/Shared/domain'

export class SearchCoursesByCriteriaQuery extends Query {
  readonly filters: Map<string, string>[]
  readonly orderBy?: string
  readonly orderType?: string
  readonly limit?: number
  readonly offset?: number

  constructor(filters: Map<string, string>[], orderBy?: string, orderType?: string, limit?: number, offset?: number) {
    super()
    this.filters = filters
    this.orderBy = orderBy
    this.orderType = orderType
    this.limit = limit
    this.offset = offset
  }
}
