import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import session from '@fastify/session'
import { FastifyReply, FastifyRequest } from 'fastify'
import keycloak, { DefaultToken, KeycloakOptions } from 'fastify-keycloak-adapter'
import fastifyQs from 'fastify-qs'
import http from 'http'
import { resolve } from 'path'
import qs from 'qs'
import { container } from 'tsyringe'

import { Monitoring } from '@/Contexts/Shared/domain'
import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
import { error, logger } from '@/Contexts/Shared/infrastructure/Logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { GeneralRequestValidation } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

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
  readonly #adapter = new FastifyAdapter({ logger: logger() })
  #httpServer?: http.Server

  get httpServer() {
    return this.#httpServer
  }

  constructor(options?: Options) {
    this.#options = options

    this.#httpServer = this.#adapter.app.server
    this.#adapter.enableCors()
    this.#adapter
      .setMonitoringModule(container.resolve<Monitoring>(TYPES.Monitoring))
      .setValidationModule(new JoiModule())
      .setValidationModule(new GeneralRequestValidation())
  }

  setup() {
    const opts: KeycloakOptions = {
      appOrigin: 'http://localhost:8081',
      useHttps: false,
      keycloakSubdomain: 'localhost:8081/realms/land-management',
      clientId: 'nodejs-land-microservice',
      clientSecret: '2WHsTY0wjAhiowbrQGMoNf2smimeePq7',
      disableCookiePlugin: true,
      disableSessionPlugin: true,
      autoRefreshToken: true,
      unauthorizedHandler: (request: FastifyRequest, reply: FastifyReply) => {
        reply.status(401).send({ message: `Invalid request` })
      },
      userPayloadMapper: (tokenPayload: unknown) => ({
        account: (tokenPayload as DefaultToken).preferred_username,
        name: (tokenPayload as DefaultToken).name,
      }),
      // excludedPatterns: ['/blocks/**'],
    }
    this.#adapter
      .register(fastifyFormBody as any, { parser: (str: string) => qs.parse(str) })
      .register(fastifyQs)
      .register(fastifyHelmet)
      .register(fastifyRateLimit)
      .register(session, {
        secret: 'OngV0HMhhdK2MRb8eS6y3pEX7YurEzL989z33BpMqdI=',
        cookie: {
          secure: false,
        },
      })
      .register(keycloak, opts)
  }

  async listen() {
    await this.#adapter.bootstrap({
      controller: resolve(__dirname, './'),
      resolver: TsyringeControllerResolver,
      isProduction: this.#options?.env === 'production',
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
