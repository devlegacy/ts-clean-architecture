import { Order } from './Order'
import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class OrderByCreatedAt extends Order {
  constructor(orderType = OrderTypes.DESC) {
    super(new OrderBy('createdAt'), new OrderType(orderType))
  }
}
