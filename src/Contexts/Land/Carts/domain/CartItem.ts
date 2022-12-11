import { Money, NumberValueObject } from '@/Contexts/Shared/domain'

import { ItemId } from '../../Shared/domain'

// vo
export class Amount extends NumberValueObject {
  constructor(amount: number) {
    super(amount)
  }

  plus(vo: Amount) {
    const amount = new Amount(this.value + vo.value)
    return amount
  }

  minus(vo: Amount) {
    const amount = new Amount(this.value - vo.value)
    return amount
  }
}

// vo?
export class CartItem {
  readonly itemId: ItemId
  readonly price: Money

  constructor(itemId: ItemId, price: Money) {
    this.itemId = itemId
    this.price = price
  }
}
