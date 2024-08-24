import {
  injectable,
} from 'tsyringe'

import {
  CartCreatedDomainEvent,
} from '#@/src/Contexts/Land/Carts/domain/index.js'
import {
  CartId,
  UserId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  type DomainEventClass,
  type DomainEventSubscriber,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CartViewCreator,
} from './CartViewCreator.js'

@injectable()
export class CreateCartViewOnCartCreated implements DomainEventSubscriber<CartCreatedDomainEvent> {
  constructor(private readonly creator: CartViewCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [
      CartCreatedDomainEvent,
    ]
  }

  // Primitives
  async on(event: CartCreatedDomainEvent) {
    await this.creator.run(
      new CartId(event.aggregateId),
      new UserId(event.userId),
    )
  }
}
