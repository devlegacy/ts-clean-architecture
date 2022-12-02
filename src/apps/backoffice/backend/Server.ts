import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyQs from 'fastify-qs'
import http from 'http'
import { resolve } from 'path'
import qs from 'qs'

import config from '@/Contexts/Backoffice/Shared/infrastructure/config'
import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/common'
import { GeneralValidationModule } from '@/Contexts/Shared/infrastructure/GeneralValidationModule'
import { JoiModule } from '@/Contexts/Shared/infrastructure/joi'
import { error } from '@/Contexts/Shared/infrastructure/logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { SentryModule } from '@/Contexts/Shared/infrastructure/sentry'

type Options = {
  port?: number
  host?: string
  env?: string // 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

export const sentry = new SentryModule({
  options: {
    dsn: config.get('sentry.dsn'),
    debug: config.get('app.env') !== 'production'
  }
})

export class Server {
  readonly #options?: Options
  #adapter = new FastifyAdapter()
  #httpServer?: http.Server

  constructor(options?: Options) {
    this.#options = options

    this.#adapter.enableCors()
    this.#adapter
      .setMonitoringModule(sentry)
      .setValidationModule(new JoiModule())
      .setValidationModule(new GeneralValidationModule())
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
