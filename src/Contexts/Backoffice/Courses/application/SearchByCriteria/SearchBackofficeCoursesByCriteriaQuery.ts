import { type FilterValueType, Query } from '@/Contexts/Shared/domain/index.js'

export class SearchBackofficeCoursesByCriteriaQuery extends Query {
  // readonly filters: Map<string, string>[]
  // readonly orderBy?: string
  // readonly orderType?: string
  // readonly limit?: number
  // readonly offset?: number

  constructor(
    readonly filters: FilterValueType[],
    readonly orderBy?: string,
    readonly orderType?: string,
    readonly limit?: number,
    readonly offset?: number,
  ) {
    super()
    // this.filters = filters
    // this.orderBy = orderBy
    // this.orderType = orderType
    // this.limit = limit
    // this.offset = offset
  }
}
