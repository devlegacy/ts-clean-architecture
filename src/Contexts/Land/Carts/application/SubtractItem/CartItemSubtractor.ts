import { CartId } from '@/Contexts/Land/Shared/domain'
import { EventBus, QueryBus } from '@/Contexts/Shared/domain'

import { Cart, CartItem } from '../../domain'
import { CartResponse } from '../CartResponse'
import { FindCartQuery } from '../Finder'

export class CartItemSubtractor {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async run(id: CartId, item: CartItem, quantity: number) {
    const cart = await this.existsCart(id.value)
    cart.subtractItem(item, quantity)
    await this.eventBus.publish(cart.pullDomainEvents())
  }

  async existsCart(id: string) {
    const query = new FindCartQuery(id)
    const { cart } = await this.queryBus.ask<CartResponse>(query)
    return Cart.fromPrimitives(cart)
  }
}
