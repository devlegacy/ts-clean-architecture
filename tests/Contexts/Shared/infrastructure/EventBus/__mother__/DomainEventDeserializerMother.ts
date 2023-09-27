import {
  DomainEventDeserializer,
  DomainEventSubscriberResolver,
} from '@/Contexts/Shared/infrastructure/EventBus/index.js'

import { DomainEventSubscriberDummy } from '../__mocks__/index.js'

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy()
    const subscribers = new DomainEventSubscriberResolver([dummySubscriber])
    return DomainEventDeserializer.configure(subscribers)
  }
}
