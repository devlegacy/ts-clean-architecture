import { Criteria } from './Criteria'
import { Filter } from './Filter'
import { FilterField } from './FilterField'
import { FilterOperator, Operator } from './FilterOperator'
import { Filters } from './Filters'
import { FilterValue } from './FilterValue'
import { Order } from './Order'

export class LastCreatedEntities extends Criteria {
  constructor(filters: Filters, limit?: number, offset?: number) {
    super(
      new Filters([
        new Filter(new FilterField('deletedAt'), new FilterOperator(Operator.EXISTS), new FilterValue('false')),
        ...filters.filters
      ]),
      Order.createdAt(),
      limit,
      offset
    )
  }
}
