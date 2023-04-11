import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyQs from 'fastify-qs'
import http from 'http'
import qs from 'qs'

import { Logger, Monitoring } from '@/Contexts/Shared/domain'
import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
// import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
import { error } from '@/Contexts/Shared/infrastructure/Logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { GeneralRequestValidation } from '@/Contexts/Shared/infrastructure/RequestValidation'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi'
import { ZodModule } from '@/Contexts/Shared/infrastructure/RequestValidation/Zod'

import { container } from '../modules'
import { TAGS } from '../modules/tags'

type Options = {
  port?: number
  host?: string
  env?: string // 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

const logger = container.get(Logger)
const monitoring = container.get(Monitoring)

export class Server {
  readonly #options?: Options
  // #app: FastifyInstance<http2.Http2SecureServer>
  // #httpServer?: http2.Http2SecureServer
  readonly #adapter = new FastifyAdapter({ logger })
  #httpServer?: http.Server

  constructor(options?: Options) {
    this.#options = options

    this.#adapter.enableCors()
    this.#adapter
      .setMonitoringModule(monitoring)
      .setValidationModule(new JoiModule())
      .setValidationModule(new ZodModule())
      .setValidationModule(new GeneralRequestValidation())
  }

  async listen() {
    await this.#adapter.bootstrap({
      container,
      controller: container.findTaggedServiceIdentifiers(TAGS.Controller),
      resolver: DiodControllerResolver,
      isProduction: this.#options?.env === 'production',
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
