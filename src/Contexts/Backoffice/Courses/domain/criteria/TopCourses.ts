import { Criteria, Filters, Order, OrderBy, OrderType, OrderTypes } from '@/Contexts/Shared/domain'

export class TopCourses extends Criteria {
  constructor(top: number) {
    super(new Filters([]), new Order(new OrderBy('views'), new OrderType(OrderTypes.ASC)), top)
  }
}
