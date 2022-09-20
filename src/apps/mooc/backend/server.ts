import { FastifyInstance } from 'fastify'
import http from 'http'
import { AddressInfo } from 'net'
import { resolve } from 'path'

import { bootstrap } from '@/shared/bootstrap'
import { config } from '@/shared/config'
import { FastifyAdapter } from '@/shared/fastify'
import { JoiModule } from '@/shared/joi'

export class Server {
  #port: number
  // #app: FastifyInstance<http2.Http2SecureServer>
  // #httpServer?: http2.Http2SecureServer
  #app: FastifyInstance
  #httpServer?: http.Server

  constructor(port = 8080) {
    this.#port = port

    const adapter = new FastifyAdapter()
    adapter.enableCors()
    adapter.setValidationModule(new JoiModule())

    this.#app = adapter.instance
  }

  async bootstrap() {
    await bootstrap(this.#app, { controller: resolve(__dirname, './controllers') })
  }

  async listen() {
    await this.bootstrap()

    await this.#app.listen({
      port: this.#port,
      host: '0.0.0.0'
    })

    this.#httpServer = this.#app.server

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(`🚀 Server running on:\thttp://localhost:${address.port}`)
    this.#app.log.info(`\t\t\t\thttp://localhost:${address.port}`)
    this.#app.log.info('    Press CTRL-C to stop 🛑')

    const APP_DEBUG = config.get<boolean>('APP_DEBUG', false)
    if (APP_DEBUG) {
      this.#app.log.info(this.#app.printRoutes())
    }
  }

  getHttpServer() {
    return this.#httpServer
  }

  stop() {
    try {
      this.#httpServer?.close()
    } catch (e) {
      this.#app.log.error(e)
    }
  }
}
