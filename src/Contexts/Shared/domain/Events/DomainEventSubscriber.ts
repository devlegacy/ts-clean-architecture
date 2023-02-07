import { DomainEvent, DomainEventClass } from './DomainEvent'

// EventHandler
export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): DomainEventClass[]
  on(domainEvent: T): Promise<void>
}
