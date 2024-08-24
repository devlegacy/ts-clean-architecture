import {
  Money,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  ItemId,
} from '../../Shared/domain/index.js'
import {
  Amount,
  CartItem,
} from './CartItem.js'

export class CartItems extends Map<CartItem, Amount> {
  add(cartItem: CartItem, quantity: number) {
    let amount = new Amount(quantity)
    if (this.has(cartItem)) {
      const cartAmount = this.get(cartItem) as Amount
      amount = cartAmount.plus(amount)
    }
    this.set(
      cartItem,
      amount,
    )
  }

  subtract(cartItem: CartItem, quantity: number) {
    let amount = new Amount(quantity)
    if (this.has(cartItem)) {
      const cartAmount = this.get(cartItem) as Amount
      amount = cartAmount.minus(amount)
    }
    this.set(
      cartItem,
      amount,
    )
  }

  calculatePrice() {
    let total = 0
    for (const [
      item,
      quantity,
    ] of this) {
      total += item.price.amount * quantity.value
    }
    return new Money(
      total,
      'mxn',
    )
  }
}

const firstItem = new CartItem(
  new ItemId('d926938c-40f7-485a-ba7a-c0255d2fcb90'),
  new Money(
    10,
    'usd',
  ),
)
const secondItem = new CartItem(
  new ItemId('fb74a5f1-a6eb-4fcc-b4ed-ba4c16073893'),
  new Money(
    11,
    'usd',
  ),
)
const thirdItem = new CartItem(
  new ItemId('d804ea03-50c2-4c1f-a5de-ab43d3f63a91'),
  new Money(
    12,
    'usd',
  ),
)

const i = new CartItems()
i.add(
  firstItem,
  10,
)
i.add(
  firstItem,
  20,
)
i.add(
  secondItem,
  10,
)
i.add(
  thirdItem,
  10,
)
i.subtract(
  firstItem,
  5,
)
i.calculatePrice()

// eslint-disable-next-line no-console
console.log(i)
