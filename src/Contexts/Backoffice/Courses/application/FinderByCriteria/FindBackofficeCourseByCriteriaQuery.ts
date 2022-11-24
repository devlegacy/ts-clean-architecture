import { Query } from '@/Contexts/Shared/domain'

export class FindBackofficeCourseByCriteriaQuery extends Query {
  readonly filters: Map<string, string>[]

  constructor(filters: Map<string, string>[]) {
    super()
    this.filters = filters
  }
}
