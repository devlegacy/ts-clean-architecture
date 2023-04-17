import { DomainEvent } from './DomainEvent'

// EventHandler
export interface IDomainEventSubscriber<T extends DomainEvent = DomainEvent> {
  // subscribedTo(): DomainEventClass[]
  // subscribedTo(): (typeof DomainEvent)[]
  on(domainEvent: T): Promise<void>
}
