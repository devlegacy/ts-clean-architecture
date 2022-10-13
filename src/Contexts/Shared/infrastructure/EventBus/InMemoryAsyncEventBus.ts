import { info } from '@qualy/logger'
import { EventEmitter } from 'events'

import { DomainEvent, EventBus } from '../../domain'
import { DomainEventSubscribers } from './DomainEventSubscribers'

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      info(`[emit]: ${event.eventName}`)
      this.emit(event.eventName, event)
    })
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    subscribers.items.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        info(`[on]: ${event.EVENT_NAME}`)
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber))
      })
    })
  }
}
