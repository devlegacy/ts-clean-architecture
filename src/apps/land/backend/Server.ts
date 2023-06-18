import fastifyFormBody from '@fastify/formbody'
// import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
// import session from '@fastify/session'
// import { FastifyReply, FastifyRequest } from 'fastify'
// import keycloak, { DefaultToken, KeycloakOptions } from 'fastify-keycloak-adapter'
// import fastifyQs from 'fastify-qs'
import http from 'http'
import { Logger as PinoLoggerType } from 'pino'
import qs from 'qs'

import { Logger, Monitoring } from '@/Contexts/Shared/domain'
import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
import { error } from '@/Contexts/Shared/infrastructure/Logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { DefaultHttpErrorHandler } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

import { container } from '../modules'
import { TAGS } from '../modules/tags'

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

    this.#httpServer = this.#adapter.app.server
    this.#adapter.enableCors()
    this.#adapter
      .setMonitoringModule(monitoring)
      .setValidationModule(new JoiModule())
      .setErrorHandler(new DefaultHttpErrorHandler())
  }

  setup() {
    // const opts: KeycloakOptions = {
    //   appOrigin: 'http://localhost:8081',
    //   useHttps: false,
    //   keycloakSubdomain: 'localhost:8081/realms/land-management',
    //   clientId: 'nodejs-land-microservice',
    //   clientSecret: '2WHsTY0wjAhiowbrQGMoNf2smimeePq7',
    //   disableCookiePlugin: true,
    //   disableSessionPlugin: true,
    //   autoRefreshToken: true,
    //   unauthorizedHandler: (request: FastifyRequest, reply: FastifyReply) => {
    //     reply.status(401).send({ message: `Invalid request` })
    //   },
    //   userPayloadMapper: (tokenPayload: unknown) => ({
    //     account: (tokenPayload as DefaultToken).preferred_username,
    //     name: (tokenPayload as DefaultToken).name,
    //   }),
    //   // excludedPatterns: ['/blocks/**'],
    // }
    this.#adapter.register(fastifyFormBody as any, { parser: (str: string) => qs.parse(str) })
    // .register(fastifyQs)
    // .register(fastifyHelmet)
    // .register(fastifyRateLimit)
    // .register(session, {
    //   secret: 'OngV0HMhhdK2MRb8eS6y3pEX7YurEzL989z33BpMqdI=',
    //   cookie: {
    //     secure: false,
    //   },
    // })
    // .register(keycloak, opts)
  }

  async listen() {
    this.setup()
    await this.#adapter.bootstrap({
      // container,
      controller: container.findTaggedServiceIdentifiers(TAGS.Controller) as Class<unknown>[],
      resolver: DiodControllerResolver(container),
      // isProduction: this.#options?.env === 'production',
    })
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
