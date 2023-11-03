import { Response } from '@/Contexts/Shared/domain/index.js'

import { Cart, CartPrimitiveType } from '../domain/index.js'

export class CartResponse implements Response {
  readonly cart: CartPrimitiveType

  constructor(cart: Cart) {
    this.cart = cart.toPrimitives()
  }
}
