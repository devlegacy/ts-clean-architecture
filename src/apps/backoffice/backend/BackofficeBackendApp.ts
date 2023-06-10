import { config } from '@/Contexts/Backoffice/Shared/infrastructure'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscriberResolver, RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus'

import { container } from '../modules'
import { Server } from './Server'

export class BackofficeBackendApp {
  #server?: Server

  get httpServer() {
    const server = this.#server?.httpServer
    return server
  }

  async start() {
    await this.#startHttp()
    await this.#startSubscribers() // first or second (?)
  }

  async stop() {
    const rabbitMQConnection = container.get(RabbitMQConnection)
    await rabbitMQConnection.close()
    this.#server?.stop()
  }

  async #startHttp() {
    const conf = config.get('app')
    this.#server = new Server(conf)
    await this.#server.listen()
  }

  async #startSubscribers() {
    await this.#configureEventBus()
  }

  async #configureEventBus() {
    const eventBus = container.get(EventBus)
    const rabbitMQConnection = container.get(RabbitMQConnection)
    await rabbitMQConnection.connect()
    const subscribers = DomainEventSubscriberResolver.fromContainer(container)
    eventBus.addSubscribers(subscribers)
  }
}
