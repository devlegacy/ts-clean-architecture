import { DomainEvent, DomainEventClass } from './DomainEvent'

// EventHandler
export interface IDomainEventSubscriber<T extends DomainEvent = DomainEvent> {
  subscribedTo(): DomainEventClass[]
  on(domainEvent: T): Promise<void>
}
