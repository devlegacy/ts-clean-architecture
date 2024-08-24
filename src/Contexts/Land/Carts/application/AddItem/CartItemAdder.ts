import {
  CartId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  EventBus,
  QueryBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Cart,
  CartItem,
} from '../../domain/index.js'
import {
  CartResponse,
} from '../CartResponse.js'
import {
  FindCartQuery,
} from '../Finder/index.js'

export class CartItemAdder {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async run(id: CartId, item: CartItem, quantity: number) {
    const cart = await this.existsCart(id.value)
    cart.addItem(
      item,
      quantity,
    )
    await this.eventBus.publish(cart.pullDomainEvents())
  }

  async existsCart(id: string) {
    const query = new FindCartQuery(id)
    const {
      cart,
    } = await this.queryBus.ask<CartResponse>(query)
    return Cart.fromPrimitives(cart)
  }
}
