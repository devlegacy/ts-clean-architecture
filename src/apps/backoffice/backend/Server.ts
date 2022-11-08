import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import { FastifyInstance, PrintRoutesOptions } from 'fastify'
import fastifyQs from 'fastify-qs'
import http from 'http'
import { AddressInfo } from 'net'
import { resolve } from 'path'
import qs from 'qs'

import config from '@/Contexts/Backoffice/Shared/infrastructure/config'
import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/common'
import { GeneralValidationModule } from '@/Contexts/Shared/infrastructure/GeneralValidationModule'
import { JoiModule } from '@/Contexts/Shared/infrastructure/joi'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'

const printConfig: PrintRoutesOptions = {
  commonPrefix: false,
  includeHooks: true,
  includeMeta: true // ['metaProperty']
}

export class Server {
  readonly #port: number

  #adapter: FastifyAdapter = new FastifyAdapter()
  #app?: FastifyInstance
  #httpServer?: http.Server

  constructor(port = 8080) {
    this.#port = port

    this.#adapter.enableCors()
    this.#adapter.setValidationModule(new JoiModule()).setValidationModule(new GeneralValidationModule())
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './controllers'),
      resolver: TsyringeControllerResolver,
      isProduction: config.get('app.env') === 'production'
    })
    this.#app = this.#adapter.instance
      .register(fastifyFormBody, { parser: (str) => qs.parse(str) })
      .register(fastifyQs)
      .register(fastifyHelmet)
      .register(fastifyRateLimit)
    await this.#app.listen({
      port: this.#port,
      host: config.get('app.ip')
    })
    this.#httpServer = this.#app.server
    const address: AddressInfo = this.#app.server.address() as AddressInfo
    this.#app.log.info(`🚀 Mock Backend App is running on: http://localhost:${address.port}`)
    this.#app.log.info(`\ton mode: ${config.get('app.env')}`)
    this.#app.log.info(`\thttp://localhost:${address.port}`)
    this.#app.log.info('\tPress CTRL-C to stop 🛑')

    if (config.get('app.debug')) this.#app.log.info(this.#app.printRoutes(printConfig))
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
