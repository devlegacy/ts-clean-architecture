import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { EventBus } from '@/Contexts/Shared/domain'

import { Cart, CartRepository } from '../../domain'

export class CartCreator {
  constructor(
    private readonly repository: CartRepository,
    private readonly bus: EventBus
  ) {}

  async run(id: CartId, userId: UserId) {
    const cart = Cart.create(id, userId)

    await this.repository.save(cart)
    await this.bus.publish(cart.pullDomainEvents())
  }
}
