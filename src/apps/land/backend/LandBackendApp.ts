import { Server as SocketServer, Socket } from 'socket.io'

import config from '@/Contexts/Land/Shared/infrastructure/config/index.js'
import { EventBus } from '@/Contexts/Shared/domain/index.js'
import { DomainEventSubscriberResolver, InMemoryAsyncEventBus } from '@/Contexts/Shared/infrastructure/index.js'
import { info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import { container } from '../modules/index.js'
import { Server } from './Server.js'

export class LandBackendApp {
  #server?: Server

  get httpServer() {
    return this.#server?.httpServer
  }

  async start() {
    await this.startHttp()
    await this.startSubscribers()
  }

  async startHttp() {
    // const conf = config.get('app')
    this.#server = new Server({
      ...config.get('app'),
      ...config.get('http'),
    })
    await this.#server.listen()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    const eventBus = container.get(EventBus) as InMemoryAsyncEventBus
    // const rabbitMQConnection = container.get(RabbitMQConnection)
    // await rabbitMQConnection.connect()

    const io = new SocketServer(this.httpServer)
    io.on('connection', (socket: Socket) => {
      info('a user connected')
      socket.broadcast.emit('hi')
      socket.on('disconnect', () => {
        info('user disconnected')
      })
    })
    setTimeout(() => {
      io.emit('some event', {
        someProperty: 'some value',
        otherProperty: 'other value',
      })
    }, 3000)

    const subscribers = DomainEventSubscriberResolver.fromContainer(container)
    eventBus.addSubscribers(subscribers)
    eventBus.addSocketServer(io)
  }

  async stop() {
    // const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    // await rabbitMQConnection.close()
    this.#server?.stop()
  }
}
