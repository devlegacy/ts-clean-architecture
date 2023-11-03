import { Criteria, Filters, Order, OrderBy, OrderType, OrderTypes } from '@/Contexts/Shared/domain/index.js'

/**
 * Criteria patter -> converts to -> Specification patter when we can express [ business language | domain language ]
 * Domain language
 * Domain specificity
 */
export class TopCourses extends Criteria {
  constructor(top: number) {
    super(new Filters([]), new Order(new OrderBy('views'), new OrderType(OrderTypes.ASC)), top)
  }
}
