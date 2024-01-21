import { Criteria } from './Criteria.js'
import { Filter } from './Filter.js'
import { FilterField } from './FilterField.js'
import { FilterOperator, Operator } from './FilterOperator.js'
import { Filters } from './Filters.js'
import { FilterValue } from './FilterValue.js'
import { Order } from './Order.js'

export class LastCreatedEntities extends Criteria {
  constructor(filters: Filters, limit?: number, offset?: number) {
    super(
      new Filters([
        new Filter(new FilterField('deletedAt'), new FilterOperator(Operator.EXISTS), new FilterValue('false')),
        ...filters.filters,
      ]),
      Order.createdAt(),
      limit,
      offset,
    )
  }
}
