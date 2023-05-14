import { DomainEvent } from './DomainEvent'
import { DomainEventSubscribers } from './DomainEventSubscribers'

export abstract class EventBus {
  abstract publish(events: DomainEvent[]): Promise<void>
  // NOTE: Helper to resolve and avoid circular dependencies with the current container
  // Mediator pattern
  abstract addSubscribers(subscribers: DomainEventSubscribers): void
}
