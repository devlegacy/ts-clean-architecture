import config from '@/Contexts/Mooc/Shared/infrastructure/config'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscriberResolver, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { Server } from './Server'

export class MoocBackendApp {
  #server?: Server

  get httpServer() {
    const server = this.#server?.getHttpServer()
    return server
  }

  async start() {
    await this.startHttp()
    await this.startSubscribers()
  }

  async startHttp() {
    const conf = config.get('app')
    this.#server = new Server(conf)
    await this.#server.listen()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    const eventBus = container.get(EventBus)
    const rabbitMQConnection = container.get(RabbitMQConnection)
    await rabbitMQConnection.connect()
    const subscribers = DomainEventSubscriberResolver.fromContainer(container)
    eventBus.addSubscribers(subscribers)
  }

  async stop() {
    const rabbitMQConnection = container.get(RabbitMQConnection)
    await rabbitMQConnection.close()
    this.#server?.stop()
  }
}
