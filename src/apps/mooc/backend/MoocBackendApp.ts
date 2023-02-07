import '../modules'

import { container } from 'tsyringe'

import config from '@/Contexts/Mooc/Shared/infrastructure/config'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscribers, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { TYPES } from '../modules/types'
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
    const eventBus = container.resolve<EventBus>(TYPES.EventBus)
    const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    await rabbitMQConnection.connect()

    const subscribers = DomainEventSubscribers
      .from
      // containerBuilder()
      ()
    eventBus.addSubscribers(subscribers)
  }

  async stop() {
    const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    await rabbitMQConnection.close()
    this.#server?.stop()
  }
}
