import { Response } from '@/Contexts/Shared/domain'

import { Cart, CartPrimitiveType } from '../domain'

export class CartResponse implements Response {
  readonly cart: CartPrimitiveType

  constructor(cart: Cart) {
    this.cart = cart.toPrimitives()
  }
}
