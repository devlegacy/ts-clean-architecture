import { DomainEventSubscribers } from '../../infrastructure/EventBus'
import { DomainEvent } from './DomainEvent'

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>
  // NOTE: Helper to resolve and avoid circular dependencies with the current container
  addSubscribers(subscribers: DomainEventSubscribers): void
}
