import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import type { FastifyInstance } from 'fastify'
import fastifyQs from 'fastify-qs'
import http from 'http'
import { resolve } from 'path'
import qs from 'qs'

import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/common'
import { GeneralValidationModule } from '@/Contexts/Shared/infrastructure/GeneralValidationModule'
import { JoiModule } from '@/Contexts/Shared/infrastructure/joi'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'

type Config = {
  port?: number
  host?: string
  env?: string // 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

export class Server {
  readonly #config?: Config
  #adapter: FastifyAdapter = new FastifyAdapter()
  #app?: FastifyInstance
  #httpServer?: http.Server

  constructor(config?: Config) {
    this.#config = config

    this.#adapter.enableCors()
    this.#adapter.setValidationModule(new JoiModule()).setValidationModule(new GeneralValidationModule())
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './controllers'),
      resolver: TsyringeControllerResolver,
      isProduction: this.#config?.env === 'production'
    })
    this.#app = this.#adapter.instance
      .register(fastifyFormBody, { parser: (str) => qs.parse(str) })
      .register(fastifyQs)
      .register(fastifyHelmet)
      .register(fastifyRateLimit)

    this.#httpServer = await this.#adapter.listen(this.#config ?? {})
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
