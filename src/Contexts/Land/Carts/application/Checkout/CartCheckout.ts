import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { CartId, OrderId } from '@/Contexts/Land/Shared/domain'
import { EventBus, QueryBus } from '@/Contexts/Shared/domain'

import { Cart } from '../../domain'
import { CartResponse } from '../CartResponse'
import { FindCartQuery } from '../Finder'

@injectable()
export class CartCheckout {
  constructor(
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  async run(id: CartId, orderId: OrderId) {
    const cart = await this.existsCart(id.value)
    cart.applyCheckout(orderId)
    await this.eventBus.publish(cart.pullDomainEvents())
  }

  async existsCart(id: string) {
    const query = new FindCartQuery(id)
    const { cart } = await this.queryBus.ask<CartResponse>(query)
    return Cart.fromPrimitives(cart)
  }
}
