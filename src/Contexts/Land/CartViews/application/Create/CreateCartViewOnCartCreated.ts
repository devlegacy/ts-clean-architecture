import { injectable } from 'tsyringe'

import { CartCreatedDomainEvent } from '@/Contexts/Land/Carts/domain'
import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { DomainEventClass, IDomainEventSubscriber } from '@/Contexts/Shared/domain'

import { CartViewCreator } from './CartViewCreator'

@injectable()
export class CreateCartViewOnCartCreated implements IDomainEventSubscriber<CartCreatedDomainEvent> {
  constructor(private readonly creator: CartViewCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [CartCreatedDomainEvent]
  }

  // Primitives
  async on(event: CartCreatedDomainEvent) {
    await this.creator.run(new CartId(event.aggregateId), new UserId(event.userId))
  }
}
