import { FastifyInstance } from 'fastify'
import * as http from 'http'
import { AddressInfo } from 'net'

import { bootstrap } from '@/shared/bootstrap'
import { config } from '@/shared/config'
import { FastifyAdapter } from '@/shared/fastify'
import { JoiModule } from '@/shared/joi'

export class Server {
  #port: number
  #app: FastifyInstance
  #httpServer?: http.Server

  constructor(port = 8080) {
    this.#port = port

    this.#app = new FastifyAdapter().enableCors().setValidationModule(new JoiModule()).instance
  }

  async bootstrap() {
    console.time('Bootstrap')
    await bootstrap(this.#app, { controller: './src/apps/mooc/backend/controllers' })
    console.timeEnd('Bootstrap')
  }

  async listen() {
    await this.bootstrap().then(() =>
      this.#app.listen({
        port: this.#port,
        host: '0.0.0.0'
      })
    )

    this.#httpServer = this.#app.server

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(`🚀 Server running on: http://localhost:${address.port}`)
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
