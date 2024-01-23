import http from 'node:http'

// import fastifySwagger, { JSONObject } from '@fastify/swagger'
// import fastifySwaggerUi from '@fastify/swagger-ui'
import type { Logger as PinoLoggerType } from 'pino'
import qs from 'qs'

import { Logger, Monitoring } from '@/Contexts/Shared/domain/index.js'
import { DiodControllerResolver } from '@/Contexts/Shared/infrastructure/Common/index.js'
import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/Fastify/index.js'
import { error } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import { DefaultHttpErrorHandler } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/index.js'
import { JoiModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'
import { ZodModule } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod/index.js'

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
  // #app: FastifyInstance<http2.Http2SecureServer>
  // #httpServer?: http2.Http2SecureServer
  readonly #adapter = new FastifyAdapter({ logger })
  #httpServer?: http.Server

  get httpServer() {
    return this.#httpServer
  }

  constructor(options?: Options) {
    this.#options = options
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
      this.#adapter.enableCors()
      this.#adapter.setMonitoringModule(monitoring)
      await this.#adapter
        .register(import('@fastify/formbody') as any, { parser: (str: string) => qs.parse(str) })
        .register(import('fastify-qs'))
        .register(import('@fastify/helmet'), {
          xssFilter: true,
          noSniff: true,
          hidePoweredBy: true,
          frameguard: { action: 'deny' },
        })
        .register(import('@fastify/rate-limit'))
    }
    this.#httpServer = await this.#adapter.listen(this.#options ?? {})
  }

  // swagger() {
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
  // }

  stop() {
    try {
      this.#httpServer?.close()
    } catch (e) {
      error(e)
    }
  }
}
