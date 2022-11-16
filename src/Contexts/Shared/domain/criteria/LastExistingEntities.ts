import { Criteria } from './Criteria'
import { Filter } from './Filter'
import { FilterField } from './FilterField'
import { FilterOperator, Operator } from './FilterOperator'
import { Filters } from './Filters'
import { FilterValue } from './FilterValue'
import { OrderByCreatedAt } from './OrderByCreatedAt'

export class LastExistingEntities extends Criteria {
  constructor(filters: Filters, limit?: number, offset?: number) {
    super(
      new Filters([
        new Filter(new FilterField('deletedAt'), new FilterOperator(Operator.EXISTS), new FilterValue('false')),
        ...filters.filters
      ]),
      new OrderByCreatedAt(),
      limit,
      offset
    )
  }
}
