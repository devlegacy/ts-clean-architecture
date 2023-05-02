import { FilterValueType, Query } from '@/Contexts/Shared/domain'

export class FindBackofficeCourseByCriteriaQuery extends Query {
  // readonly filters: Map<string, string>[]

  constructor(readonly filters: FilterValueType[]) {
    super()
    // this.filters = filters
  }
}
