import { config } from '@/Contexts/Mooc/Shared/infrastructure'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscriberResolver, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { Server } from './Server'

const rabbitMQConnection = container.get(RabbitMQConnection)
export class MoocBackendApp {
  #server?: Server

  get httpServer() {
    const server = this.#server?.httpServer
    return server
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
    const conf = config.get('app')
    this.#server = new Server(conf)
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
