import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { EventBus } from '@/Contexts/Shared/domain'

import { Cart, CartRepository } from '../../domain'

@injectable()
export class CartCreator {
  constructor(
    @inject(TYPES.CartRepository) private readonly repository: CartRepository,
    @inject(TYPES.EventBus) private readonly bus: EventBus
  ) {}

  async run(id: CartId, userId: UserId) {
    const cart = Cart.create(id, userId)

    await this.repository.save(cart)
    await this.bus.publish(cart.pullDomainEvents())
  }
}
