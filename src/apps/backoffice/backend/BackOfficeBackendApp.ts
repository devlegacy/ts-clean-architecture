import config from '@/Contexts/Backoffice/Shared/infrastructure/config'

import { Server } from './Server'

export class BackOfficeBackendApp {
  #server?: Server

  get httpServer() {
    return this.#server?.getHttpServer()
  }

  async start() {
    await this.startHttp()
    await this.startSubscribers()
  }

  async startHttp() {
    const port = config.get('app.port')
    this.#server = new Server(port)
    await this.#server.listen()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    // const eventBus = container.resolve<EventBus>(TYPES.EventBus)
    // eventBus.addSubscribers(DomainEventSubscribers.from())
  }

  stop() {
    this.#server?.stop()
  }
}
