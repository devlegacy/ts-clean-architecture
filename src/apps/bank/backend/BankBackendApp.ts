import config from '@/Contexts/Bank/Shared/infrastructure/config/index.js'

import { Server } from './Server.js'

export class BankBackendApp {
  #server?: Server

  get httpServer() {
    return this.#server?.httpServer
  }

  async start() {
    await this.startHttp()
    await this.startSubscribers()
  }

  async startHttp() {
    // const conf = {
    //   host: config.get('app.ip'),
    //   env: config.get('app.env'),
    //   debug: config.get('app.debug'),
    //   name: config.get('app.name'),
    //   port: config.get('app.port'),
    // }
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
    // const eventBus = container.resolve<EventBus>(TYPES.EventBus)
    // //   const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    // //   await rabbitMQConnection.connect()
    // const subscribers = DomainEventSubscribers.from()
    // eventBus.addSubscribers(subscribers)
  }

  async stop() {
    // const rabbitMQConnection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    // await rabbitMQConnection.close()
    this.#server?.stop()
  }
}
