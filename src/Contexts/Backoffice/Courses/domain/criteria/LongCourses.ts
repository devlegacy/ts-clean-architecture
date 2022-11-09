import {
  Criteria,
  Filter,
  FilterField,
  FilterOperator,
  Filters,
  FilterValue,
  Operator,
  Order,
  OrderBy,
  OrderType,
  OrderTypes
} from '@/Contexts/Shared/domain'

export class LongCourses extends Criteria {
  constructor() {
    super(
      new Filters([new Filter(new FilterField('duration'), new FilterOperator(Operator.GT), new FilterValue('20'))]),
      new Order(new OrderBy('name'), new OrderType(OrderTypes.ASC))
    )
  }
}
