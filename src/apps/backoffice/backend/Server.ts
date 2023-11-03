import http from 'node:http'

import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyQs from 'fastify-qs'
import type { Logger as PinoLoggerType } from 'pino'
import qs from 'qs'

import { Logger, Monitoring } from '@/Contexts/Shared/domain/index.js'
import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common/index.js'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/Fastify/index.js'
// import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/Common/index.js'
import { error } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import { DefaultHttpErrorHandler } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/index.js'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

import { container } from '../modules/index.js'
import { TAGS } from '../modules/tags.js'

type Options = {
  port?: number
  host?: string
  env?: 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

const { logger } = container.get<Logger<PinoLoggerType>>(Logger)
const monitoring = container.get(Monitoring)

export class Server {
  readonly #options?: Options
  readonly #adapter = new FastifyAdapter({ logger })
  #httpServer?: http.Server

  get httpServer() {
    return this.#httpServer
  }

  constructor(options?: Options) {
    this.#options = options

    this.#adapter.enableCors()
    if (!(this.#options?.env === 'test')) {
      this.#adapter
        .setMonitoringModule(monitoring)
        .setValidationModule(new JoiModule())
        .setErrorHandler(new DefaultHttpErrorHandler())
    }
    this.#adapter.setValidationModule(new JoiModule()).setErrorHandler(new DefaultHttpErrorHandler())
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: container.findTaggedServiceIdentifiers(TAGS.Controller) as Class<unknown>[],
      resolver: DiodControllerResolver(container),
    })

    if (!(this.#options?.env === 'test')) {
      this.#adapter
        .register(fastifyFormBody as any, { parser: (str: string) => qs.parse(str) })
        .register(fastifyQs)
        .register(fastifyHelmet)
        .register(fastifyRateLimit)
    }
    this.#httpServer = await this.#adapter.listen(this.#options ?? {})
  }

  stop() {
    try {
      this.#httpServer?.close()
    } catch (e) {
      error(e)
    }
  }
}
