import {
  EventEmitter,
} from 'node:events'

import {
  Service,
} from 'diod'
import {
  Server as SocketServer,
} from 'socket.io'

import {
  info,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'

import {
  DomainEvent,
  type DomainEventClass,
  type DomainEventSubscribers,
  EventBus,
  EVENTS_HANDLER_METADATA,
} from '../../../domain/index.js'

// InMemory, memoria de instancia
@Service()
export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  private io?: SocketServer
  addSocketServer(io: SocketServer) {
    this.io = io
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      info(`[emit 📤 ]: ${event.eventName}`)
      this.emit(
        event.eventName,
        event,
      )
      this.io?.emit(
        event.eventName,
        event.toPrimitives(),
      )
    })
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    subscribers.items.forEach((subscriber) => {
      const events: DomainEventClass[] = Reflect.getMetadata(
        EVENTS_HANDLER_METADATA,
        subscriber.constructor,
      ) ?? []
      events.forEach((event) => {
        info(`[on 📥 ]: ${event.EVENT_NAME}`)
        this.on(
          event.EVENT_NAME,
          subscriber.on.bind(subscriber),
        )
      })
    })
  }
}
