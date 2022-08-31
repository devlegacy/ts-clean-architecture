import fastifyCompress from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
import Fastify, { FastifyHttp2SecureOptions, FastifyInstance, FastifyServerOptions } from 'fastify'
import { readFileSync } from 'fs'
import { Http2SecureServer } from 'http2'
import { join } from 'path'

import { ValidationModule } from './joi'
import { logger } from './logger'

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

const fastifyServerOptions: FastifyHttp2SecureOptions<Http2SecureServer> = {
  ajv,
  logger: logger(),
  // Read more on: https://www.fastify.io/docs/latest/Reference/HTTP2/#plain-or-insecure
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: readFileSync(join(__dirname, './key.pem')),
    cert: readFileSync(join(__dirname, './cert.pem'))
  },
  http2SessionTimeout: 60,
  ignoreTrailingSlash: true,
  forceCloseConnections: true // On Test or development
  // trustProxy: true
  // bodyLimit: 0,
}

export class FastifyAdapter {
  #instance: FastifyInstance<Http2SecureServer>

  get instance() {
    return this.#instance
  }

  constructor({ options }: { options?: FastifyServerOptions<Http2SecureServer> } = {}) {
    this.#instance = Fastify({
      ...fastifyServerOptions,
      ...options
    })

    this.#instance
      .register(fastifyHelmet)
      .register(fastifyCompress)
      // .register(fastifyRateLimit)
      .register(fastifyCookie)
  }

  enableCors(options: FastifyCorsOptions = {}) {
    this.#instance.register(fastifyCors, options)
  }

  setValidationModule(validationModule: ValidationModule) {
    this.#instance.setValidatorCompiler(validationModule.validationCompiler)

    // this.#instance.setErrorHandler(validationModule.errorHandler)
  }
}
