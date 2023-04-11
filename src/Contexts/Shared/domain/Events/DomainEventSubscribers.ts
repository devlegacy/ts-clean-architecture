import { DomainEvent } from './DomainEvent'
import { IDomainEventSubscriber } from './DomainEventSubscriber'

export interface DomainEventSubscribers {
  items: IDomainEventSubscriber<DomainEvent>[]
}
