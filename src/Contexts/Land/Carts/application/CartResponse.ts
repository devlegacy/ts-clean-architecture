import { Response } from '@/Contexts/Shared/domain'

import { Cart, CartPrimitiveDto } from '../domain'

export class CartResponse implements Response {
  readonly cart: CartPrimitiveDto

  constructor(cart: Cart) {
    this.cart = cart.toPrimitives()
  }
}
