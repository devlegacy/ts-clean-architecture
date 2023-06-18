import { config } from '@/Contexts/Backoffice/Shared/infrastructure'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscriberResolver, RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus'

import { container } from '../modules'
import { Server } from './Server'

const rabbitMQConnection = container.get(RabbitMQConnection)

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
