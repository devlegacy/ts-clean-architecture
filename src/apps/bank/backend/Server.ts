import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyQs from 'fastify-qs'
import http from 'http'
import {
  resolve,
} from 'path'
import qs from 'qs'

import {
  TsyringeControllerResolver,
} from '#@/src/Contexts/Shared/infrastructure/Common/index.js'
import {
  FastifyAdapter,
} from '#@/src/Contexts/Shared/infrastructure/Fastify/index.js'
import {
  error,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'
import {
  DefaultHttpErrorHandler,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/index.js'
import {
  JoiModule,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

type Options = {
  port?: number
  host?: string
  env?: 'production' | 'development' | 'staging' | 'test'
  debug?: boolean
  name?: string
}

export class Server {
  readonly #options?: Options
  readonly #adapter = new FastifyAdapter()
  #httpServer?: http.Server

  get httpServer() {
    return this.#httpServer
  }

  constructor(options?: Options) {
    this.#options = options

    this.#httpServer = this.#adapter.app.server
    this.#adapter.enableCors()
    this.#adapter.setValidationModule(new JoiModule()).setErrorHandler(new DefaultHttpErrorHandler())
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './'),
      resolver: TsyringeControllerResolver,
      // isProduction: this.#options?.env === 'production',
    })

    this.#adapter
      .register(fastifyFormBody as any, {
        parser: (str: string) => qs.parse(str),
      })
      .register(fastifyQs)
      .register(fastifyHelmet)
      .register(fastifyRateLimit)

    await this.#adapter.listen(this.#options ?? {})
  }

  stop() {
    try {
      this.#httpServer?.close()
    } catch (e) {
      error(e)
    }
  }
}
