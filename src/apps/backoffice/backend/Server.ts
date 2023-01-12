import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyQs from 'fastify-qs'
import http from 'http'
import { resolve } from 'path'
import qs from 'qs'
import { container } from 'tsyringe'

import { Monitoring, TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/common'
import { error } from '@/Contexts/Shared/infrastructure/Logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { GeneralRequestValidation } from '@/Contexts/Shared/infrastructure/RequestValidation'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi'

import { TYPES } from '../modules/types'

type Options = {
  port?: number
  host?: string
  env?: string // 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

export class Server {
  readonly #options?: Options
  readonly #adapter = new FastifyAdapter()
  #httpServer?: http.Server

  constructor(options?: Options) {
    this.#options = options

    this.#adapter.enableCors()
    this.#adapter
      .setMonitoringModule(container.resolve<Monitoring>(TYPES.Monitoring))
      .setValidationModule(new JoiModule())
      .setValidationModule(new GeneralRequestValidation())
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './controllers'),
      resolver: TsyringeControllerResolver,
      isProduction: this.#options?.env === 'production'
    })

    this.#adapter
      .register(fastifyFormBody as any, { parser: (str: string) => qs.parse(str) })
      .register(fastifyQs)
      .register(fastifyHelmet)
      .register(fastifyRateLimit)

    this.#httpServer = await this.#adapter.listen(this.#options ?? {})
  }

  getHttpServer() {
    return this.#httpServer
  }

  stop() {
    try {
      this.#httpServer?.close()
    } catch (e) {
      error(e)
    }
  }
}
