import { DomainEventDeserializer, DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus'

import { DomainEventSubscriberDummy } from '../__mocks__'

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscribers([dummySubscriber])
    return DomainEventDeserializer.configure(subscribers)
  }
}
