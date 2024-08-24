import {
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Cart,
  type CartPrimitiveType,
} from '../domain/index.js'

export class CartResponse implements Response {
  readonly cart: CartPrimitiveType

  constructor(cart: Cart) {
    this.cart = cart.toPrimitives()
  }
}
