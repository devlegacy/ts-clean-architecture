import fastifyCompress from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'
// import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
import Fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'

import { logger } from '@/Contexts/Shared/infrastructure/logger'

import { ValidationModule } from './interfaces'

const ajv = {
  customOptions: {
    allErrors: true,
    coerceTypes: true, // change data type of data to match type keyword
    jsonPointers: true,
    // support keyword "nullable" from Open API 3 specification.
    // Refer to [ajv options](https://ajv.js.org/#options)
    nullable: true,
    removeAdditional: true, // remove additional properties
    useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
    verbose: true
  },
  plugins: []
}

// const http2Options = {
// Read more on: https://www.fastify.io/docs/latest/Reference/HTTP2/#plain-or-insecure
//   http2: true,
//   https: {
//     allowHTTP1: true, // fallback support for HTTP1
//     key: readFileSync(join(__dirname, './key.pem')),
//     cert: readFileSync(join(__dirname, './cert.pem'))
//   },
//   http2SessionTimeout: 60
// }

// const fastifyServerOptions: FastifyHttp2SecureOptions<Http2SecureServer> = {
const fastifyServerOptions: FastifyServerOptions = {
  ajv,
  logger: logger(),
  ignoreTrailingSlash: true,
  forceCloseConnections: true // On Test or development
  // trustProxy: true
  // bodyLimit: 0,
}

export class FastifyAdapter {
  // #instance: FastifyInstance
  #instance: FastifyInstance
  #validations: ValidationModule<any>[] = []

  // constructor({ options }: { options?: FastifyServerOptions<Http2SecureServer> } = {}) {
  constructor({ options }: { options?: FastifyServerOptions } = {}) {
    this.#instance = Fastify({
      ...fastifyServerOptions,
      ...options
    })

    this.#instance
      // .register(fastifyHelmet) // Note: cause conflict with GraphQL
      .register(fastifyCompress)
      // .register(fastifyRateLimit)
      .register(fastifyCookie)
  }

  get instance() {
    this.#instance.setValidatorCompiler((schemaDefinition: any): any => {
      for (const m of this.#validations) {
        if (m.validationCompiler(schemaDefinition)) {
          return m.validationCompiler(schemaDefinition)
        }
      }
    })
    this.#instance.setErrorHandler((error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
      for (const m of this.#validations) {
        m.errorHandler(error, req, res)
      }
    })

    return this.#instance
  }

  enableCors(options: FastifyCorsOptions = {}) {
    this.#instance.register(fastifyCors, options)
  }

  setValidationModule<T = unknown>(validationModule: ValidationModule<T>) {
    this.#validations.push(validationModule)

    return this
  }
}
