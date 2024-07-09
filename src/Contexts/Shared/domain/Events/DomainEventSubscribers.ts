import {
  DomainEvent,
} from './DomainEvent.js'
import type {
  DomainEventSubscriber,
} from './DomainEventSubscriber.js'

export interface DomainEventSubscribers {
  items: DomainEventSubscriber<DomainEvent>[]
}
