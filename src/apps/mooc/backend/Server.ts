import http from 'node:http'

import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
// import fastifySwagger, { JSONObject } from '@fastify/swagger'
// import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyQs from 'fastify-qs'
import { Logger as PinoLoggerType } from 'pino'
import qs from 'qs'

import { Logger, Monitoring } from '@/Contexts/Shared/domain'
import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
// import { TsyringeControllerResolver } from '@/Contexts/Shared/infrastructure/Common'
import { error } from '@/Contexts/Shared/infrastructure/Logger'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'
import { DefaultHttpErrorHandler } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'
import { ZodModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod'

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
  // #app: FastifyInstance<http2.Http2SecureServer>
  // #httpServer?: http2.Http2SecureServer
  readonly #adapter = new FastifyAdapter({ logger })
  #httpServer?: http.Server

  get httpServer() {
    return this.#httpServer
  }

  constructor(options?: Options) {
    this.#options = options

    this.#adapter.enableCors()
    if (!(this.#options?.env === 'test')) {
      this.#adapter.setMonitoringModule(monitoring)
    }
    this.#adapter
      .setValidationModule(new JoiModule())
      .setValidationModule(new ZodModule())
      .setErrorHandler(new DefaultHttpErrorHandler())
  }

  // eslint-disable-next-line max-lines-per-function
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
      // .register(fastifySwagger, {
      //   swagger: {
      //     info: {
      //       title: 'Title...',
      //       description: `Description`,
      //       version: '0.0.1',
      //     },
      //     externalDocs: {
      //       url: 'https://swagger.io',
      //       description: 'Find more info here',
      //     },
      //     host: 'localhost',
      //     schemes: ['http'],
      //     consumes: ['application/json', 'multipart/form-data'],
      //     produces: ['application/json'],
      //     tags: [],
      //   },
      //   transform: ({ schema, url }) => {
      //     const {
      //       // params = undefined,
      //       // body = undefined,
      //       // querystring = undefined,
      //       // headers = undefined,
      //       // response = undefined,
      //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //       ...transformedSchema
      //     } = schema ?? {}
      //     console.log(transformedSchema)
      //     // const schema: any = { ...others }
      //     // if (params) schema.params = Joi2Json(params)
      //     // if (body) schema.body = Joi2Json(body)
      //     // if (querystring) schema.querystring = Joi2Json(querystring)
      //     // if (headers) schema.headers = Joi2Json(headers)
      //     //  if (response) transformedSchema.response = convert(response)
      //     // transformedSchema = {} as any
      //     // (transformedSchema as unknown as JSONObject) ??
      //     return {
      //       schema: {} satisfies JSONObject, // satisfies
      //       url,
      //     }
      //   },
      // })
      // .register(fastifySwaggerUi, {
      //   routePrefix: '/documentation',
      //   uiConfig: {
      //     docExpansion: 'full', // expand/not all the documentations none|list|full
      //     deepLinking: true,
      //   },
      //   uiHooks: {
      //     onRequest(request, reply, next) {
      //       next()
      //     },
      //     preHandler(request, reply, next) {
      //       next()
      //     },
      //   },
      //   staticCSP: true,
      //   transformStaticCSP: (header) => header,
      //   transformSpecification: (swaggerObject: any, _request: any, _reply: any): any => {
      //     return swaggerObject
      //   },
      //   transformSpecificationClone: true,
      // })

      // await this.#adapter.app.ready()
      // this.#adapter.app.swagger()

      // this.#adapter.app.ready(() => {
      //   this.#adapter.app.swagger()
      // })
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
