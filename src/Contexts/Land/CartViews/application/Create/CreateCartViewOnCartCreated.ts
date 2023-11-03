import { injectable } from 'tsyringe'

import { CartCreatedDomainEvent } from '@/Contexts/Land/Carts/domain/index.js'
import { CartId, UserId } from '@/Contexts/Land/Shared/domain/index.js'
import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain/index.js'

import { CartViewCreator } from './CartViewCreator'

@injectable()
export class CreateCartViewOnCartCreated implements DomainEventSubscriber<CartCreatedDomainEvent> {
  constructor(private readonly creator: CartViewCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [CartCreatedDomainEvent]
  }

  // Primitives
  async on(event: CartCreatedDomainEvent) {
    await this.creator.run(new CartId(event.aggregateId), new UserId(event.userId))
  }
}
