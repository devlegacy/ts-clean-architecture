import { config } from '@/Contexts/Mooc/Shared/infrastructure'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscriberResolver, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { Server } from './Server'

const rabbitMQConnection = container.get(RabbitMQConnection)

// Backend App - API - Coordinator (http server, subscribers)
export class MoocBackendApp {
  #server?: Server

  get httpServer() {
    const httpServer = this.#server?.httpServer
    return httpServer
  }

  async start() {
    await this.#startHttp()
    await this.#startSubscribers()
  }

  async stop() {
    await rabbitMQConnection.close()
    this.#server?.stop()
  }

  async #startHttp() {
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
    const eventBus = container.get(EventBus)
    const subscribers = DomainEventSubscriberResolver.fromContainer(container)
    eventBus.addSubscribers(subscribers)
  }
}
