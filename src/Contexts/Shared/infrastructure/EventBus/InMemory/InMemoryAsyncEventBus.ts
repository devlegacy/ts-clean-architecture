import { EventEmitter } from 'events'
import { Server as SocketServer } from 'socket.io'

import { info } from '@/Contexts/Shared/infrastructure/Logger'

import { DomainEvent, DomainEventSubscribers, EventBus } from '../../../domain'

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  private io?: SocketServer
  addSocketServer(io: SocketServer) {
    this.io = io
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      info(`[emit 📤 ]: ${event.eventName}`)
      this.emit(event.eventName, event)
      this.io?.emit(event.eventName, event.toPrimitives())
    })
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    subscribers.items.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        info(`[on 📥 ]: ${event.EVENT_NAME}`)
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber))
      })
    })
  }
}
