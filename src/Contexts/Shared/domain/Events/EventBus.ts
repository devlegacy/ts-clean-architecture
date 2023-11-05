import { DomainEvent } from './DomainEvent.js'
import type { DomainEventSubscribers } from './DomainEventSubscribers.js'

export abstract class EventBus {
  abstract publish(events: DomainEvent[]): Promise<void>
  // NOTE: Helper to resolve and avoid circular dependencies with the current container
  // Mediator pattern
  // Typing trick Promise<void> is a subtype of void
  abstract addSubscribers(subscribers: DomainEventSubscribers): void
}
