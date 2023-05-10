import { DomainEvent } from './DomainEvent'

// EventHandler
export interface DomainEventSubscriber<T extends DomainEvent = DomainEvent> {
  // subscribedTo(): DomainEventClass[]
  // subscribedTo(): (typeof DomainEvent)[]
  on(domainEvent: T): Promise<void>
}
