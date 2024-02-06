import { config } from '@/Contexts/Mooc/Shared/infrastructure/index.js'
import { EventBus } from '@/Contexts/Shared/domain/index.js'
import { DomainEventSubscriberResolver } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscriberResolver.js'
import { RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/index.js'

import { container } from '../modules/index.js'
import { Server } from './Server.js'

const rabbitMQConnection = container.get(RabbitMQConnection)
const eventBus = container.get(EventBus)

// Backend App - API - Coordinator (http server, subscribers)
export class MoocBackendApp {
  #server?: Server

  get httpServer() {
    const httpServer = this.#server?.httpServer
    return httpServer
  }

  async start() {
    await this.#startHttpServer()
    await this.#startSubscribers()
  }

  async stop() {
    await rabbitMQConnection.close()
    this.#server?.stop()
  }

  async #startHttpServer() {
    const options = {
      ...config.get('app'),
      ...config.get('http'),
    }
    this.#server = new Server(options)
    await this.#server.listen()
  }

  async #startSubscribers() {
    await this.#configureEventBus()
  }

  async #configureEventBus() {
    await rabbitMQConnection.connect()
    const subscribers = DomainEventSubscriberResolver.fromContainer(container)
    eventBus.addSubscribers(subscribers)
  }
}
