import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { DomainEventDummy } from './DomainEventDummy'

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy]
  }

  async on(_domainEvent: DomainEventDummy): Promise<void> {
    // do nothing
  }
}
