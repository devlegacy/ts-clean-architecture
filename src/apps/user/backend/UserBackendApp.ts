import '../dependency-injection'

import { Server } from './Server'

export class UserBackendApp {
  #server?: Server

  get httpServer() {
    return this.#server?.getHttpServer()
  }

  async start() {
    const port = 8081
    this.#server = new Server(port)
    return await this.#server.listen()
  }

  stop() {
    this.#server?.stop()
  }
}
