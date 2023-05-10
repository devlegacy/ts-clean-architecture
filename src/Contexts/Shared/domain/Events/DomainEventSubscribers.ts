import { DomainEvent } from './DomainEvent'
import { DomainEventSubscriber } from './DomainEventSubscriber'

export interface DomainEventSubscribers {
  items: DomainEventSubscriber<DomainEvent>[]
}
