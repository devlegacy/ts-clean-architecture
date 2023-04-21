import '../modules'

import { Server as SocketServer, Socket } from 'socket.io'
import { container } from 'tsyringe'

import config from '@/Contexts/Land/Shared/infrastructure/config'
import { DomainEventSubscriberResolver, InMemoryAsyncEventBus } from '@/Contexts/Shared/infrastructure'
import { info } from '@/Contexts/Shared/infrastructure/Logger'

import { Server } from './Server'

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
    const conf = {
      host: config.get('app.ip'),
      env: config.get('app.env'),
      debug: config.get('app.debug'),
      name: config.get('app.name'),
      port: config.get('app.port'),
    }
    this.#server = new Server(conf)
    await this.#server.listen()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    const eventBus = container.resolve<InMemoryAsyncEventBus>('EventBus') // EventBus
    //   const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    //   await rabbitMQConnection.connect()
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
    const subscribers = DomainEventSubscriberResolver.from()
    eventBus.addSubscribers(subscribers)
    eventBus.addSocketServer(io)
  }

  async stop() {
    // const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    // await rabbitMQConnection.close()
    this.#server?.stop()
  }
}
