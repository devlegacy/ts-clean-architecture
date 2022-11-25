import { DomainEventSubscribers } from '../../infrastructure/EventBus'
import { DomainEvent } from './DomainEvent'

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>
  // Helper to solve circular dependencies
  addSubscribers(subscribers: DomainEventSubscribers): void
}
