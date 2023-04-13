import { DomainEventDeserializer, DomainEventSubscriberResolver } from '@/Contexts/Shared/infrastructure/EventBus'

import { DomainEventSubscriberDummy } from '../__mocks__'

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscriberResolver([dummySubscriber])
    return DomainEventDeserializer.configure(subscribers)
  }
}
