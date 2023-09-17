import { fileURLToPath } from 'node:url'

import type { FastifyInstance } from 'fastify'
import http from 'http'
import type { AddressInfo } from 'net'
import { resolve } from 'path'

import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common/index.js'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/Fastify/index.js'

import { container } from '../modules/index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export class Server {
  #port: number
  #adapter: FastifyAdapter = new FastifyAdapter()
  #app?: FastifyInstance
  #httpServer?: http.Server

  constructor(port = 8080) {
    this.#port = port

    const adapter = new FastifyAdapter()

    this.#app = adapter.app
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './controllers'),
      // resolver: TsyringeControllerResolver,
      resolver: DiodControllerResolver(container),
      // isProduction: false,
      // prefix: '/api/'
    })

    this.#app = this.#adapter.app

    await this.#app.listen({
      port: this.#port,
      host: '0.0.0.0',
    })

    this.#httpServer = this.#app.server

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(`🚀 Server running on:\thttp://localhost:${address.port}`)
    this.#app.log.info(`\t\t\t\thttp://localhost:${address.port}`)
    this.#app.log.info('    Press CTRL-C to stop 🛑')

    const app_debug = true
    if (app_debug) {
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
      this.#app?.log?.error(e)
    }
  }
}
