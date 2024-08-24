import {
  CartId,
  UserId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Cart,
  type CartRepository,
} from '../../domain/index.js'

export class CartCreator {
  constructor(
    private readonly repository: CartRepository,
    private readonly bus: EventBus,
  ) {}

  async run(id: CartId, userId: UserId) {
    const cart = Cart.create(
      id,
      userId,
    )

    await this.repository.save(cart)
    await this.bus.publish(cart.pullDomainEvents())
  }
}
