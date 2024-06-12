import {
  type FilterValueType,
  Query,
} from '#@/src/Contexts/Shared/domain/index.js'

export class FindBackofficeCourseByCriteriaQuery extends Query {
  // readonly filters: Map<string, string>[]

  constructor(readonly filters: FilterValueType[]) {
    super()
    // this.filters = filters
  }
}
