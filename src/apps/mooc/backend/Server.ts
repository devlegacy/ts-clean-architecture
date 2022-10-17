import { FastifyInstance } from 'fastify'
import http from 'http'
import { AddressInfo } from 'net'
import { resolve } from 'path'

import config from '@/Contexts/Mooc/Shared/infrastructure/config'
import { bootstrap, FastifyAdapter, TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure'
import { GeneralValidationModule, JoiModule, ZodModule } from '@/Contexts/Shared/infrastructure/joi/joi'

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
    adapter
      .setValidationModule(new JoiModule())
      .setValidationModule(new ZodModule())
      .setValidationModule(new GeneralValidationModule())

    this.#app = adapter.instance
  }

  async bootstrap() {
    await bootstrap(this.#app, {
      controller: resolve(__dirname, './controllers'),
      resolver: TsyringeControllerResolver,
      isProduction: config.get('app.env') === 'production'
    })
  }

  async listen() {
    await this.bootstrap()

    await this.#app.listen({
      port: this.#port,
      host: config.get('app.ip')
    })

    this.#httpServer = this.#app.server

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(`🚀 Server running on:\thttp://localhost:${address.port}`)
    this.#app.log.info(`\t\t\t\thttp://localhost:${address.port}`)
    this.#app.log.info('    Press CTRL-C to stop 🛑')

    if (config.get('app.debug')) {
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
