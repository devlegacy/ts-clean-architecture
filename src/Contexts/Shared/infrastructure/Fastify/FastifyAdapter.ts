import { type AddressInfo } from 'node:net'

import fastifyCompress from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors'
// import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyRegister,
  type FastifyReply,
  type FastifyRequest,
  type FastifyServerOptions,
  type PrintRoutesOptions,
} from 'fastify' // commonjs module

import { type ControllerResolver, HttpStatus } from '../../domain/Common/index.js'
import { DomainErrorHandler, HttpError, Monitoring } from '../../domain/index.js'
import { type HttpErrorHandler, type HttpValidationModule } from './interfaces/index.js'
import { routeRegister } from './routeRegister.js'

const { errorCodes } = Fastify
const printConfig: PrintRoutesOptions = {
  commonPrefix: false,
  includeHooks: true,
  includeMeta: true, // ['metaProperty']
}

const ajv: FastifyServerOptions['ajv'] = {
  customOptions: {
    allErrors: true,
    coerceTypes: true, // change data type of data to match type keyword
    // jsonPointers: true,
    // support keyword "nullable" from Open API 3 specification.
    // Refer to [ajv options](https://ajv.js.org/#options)
    // nullable: true,
    removeAdditional: true, // remove additional properties
    useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
    verbose: true,
  },
  plugins: [],
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
  // logger: logger(),
  ignoreTrailingSlash: true,
  // forceCloseConnections: true // On Test or development
  // trustProxy: true
  // bodyLimit: 0,
}

export class FastifyAdapter {
  // #instance: FastifyInstance
  readonly validations: HttpValidationModule<any>[] = []
  readonly errorHandlers: HttpErrorHandler[] = []
  readonly #instance: FastifyInstance
  #monitoring?: Monitoring

  get app() {
    return this.#instance
  }

  // constructor({ options }: { options?: FastifyServerOptions<Http2SecureServer> } = {}) {
  constructor(options: FastifyServerOptions = {}) {
    this.#instance = Fastify({
      ...fastifyServerOptions,
      ...options,
    })

    this.#instance
      // NOTE: This package could cause conflict with GraphQL
      // .register(fastifyHelmet)
      .register(fastifyCompress)
      // .register(fastifyRateLimit)
      .register(fastifyCookie)
  }

  enableCors(options: FastifyCorsOptions = {}) {
    this.#instance.register(fastifyCors, options)
  }

  setValidationModule<T = unknown>(validationModule: HttpValidationModule<T>) {
    this.validations.push(validationModule)

    return this
  }

  setErrorHandler(handler: HttpErrorHandler) {
    this.errorHandlers.push(handler)

    return this
  }

  setMonitoringModule(monitoring: Monitoring) {
    this.#monitoring = monitoring

    return this
  }

  async bootstrap(props: { controller: string | Class<unknown>[]; resolver: ControllerResolver; prefix?: string }) {
    this.#instance.setValidatorCompiler<unknown>((schemaDefinition) => {
      for (const m of this.validations) {
        if (m.validationCompiler(schemaDefinition)) {
          return m.validationCompiler(schemaDefinition)
        }
      }
    })
    this.#instance.setSchemaErrorFormatter((_errors) => {
      // for (const m of this.#validations) {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-expect-error
      //   m?.schemaErrorFormatter(errors)
      // }
      return new Error('')
    })
    this.#instance.setNotFoundHandler((req, res) => {
      const response = new HttpError({
        statusCode: 404,
        error: HttpStatus[404] ?? HttpStatus[404],
        path: `Route ${req.raw.method}:${req.raw.url}`,
      })
      this.#monitoring?.capture(new Error(HttpStatus[404]), { req })

      res.status(404).send(response)
    })
    // https://www.fastify.io/docs/latest/Reference/Server/#seterrorhandler
    this.#instance.setErrorHandler((err: FastifyError, req: FastifyRequest, res: FastifyReply) => {
      this.#monitoring?.capture(err, { req })
      let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
      const errorHandlers = [...this.validations, ...this.errorHandlers]
      for (const m of errorHandlers) {
        if (res.sent) break
        m.errorHandler(err, req, res)
      }
      if (res.sent) return

      if (
        (err instanceof errorCodes.FST_ERR_BAD_STATUS_CODE || err instanceof errorCodes.FST_ERR_CTP_EMPTY_JSON_BODY) &&
        err.statusCode
      ) {
        statusCode = +err.statusCode
      } else if (DomainErrorHandler.isDomainError(err)) {
        statusCode = DomainErrorHandler.toHttpCode(err)
      }
      res.status(statusCode)
      // DEBT: Remove leak data
      const response = new HttpError({
        statusCode,
        error: HttpStatus[+statusCode] ?? HttpStatus[500],
        // GeneralRequestValidation[errorHandler]: Unhandled error
        message: `${err.message}`,
        path: `Route ${req.raw.method}:${req.raw.url}`,
        code: err.code,
        stack: err.stack,
      })

      return response
    })

    await routeRegister(this, props)
  }

  register<TRegister extends Parameters<FastifyRegister<FastifyInstance>>>(
    plugin: TRegister['0'],
    opts?: TRegister['1'],
  ) {
    return this.#instance.register(plugin, opts)
  }

  async listen({
    debug,
    port,
    host,
    env,
    name,
  }: {
    debug?: boolean
    port?: number
    host?: string
    env?: 'production' | 'development' | 'staging' | 'test'
    name?: string
  }) {
    await this.#instance.listen({
      port,
      host,
    })

    const address: AddressInfo = this.#instance.server.address() as AddressInfo
    this.#instance.log.info(`🚀 ${name} is running on: http://localhost:${address.port}`)
    this.#instance.log.info(`\ton mode: ${env}`)
    this.#instance.log.info(`\thttp://localhost:${address.port}`)
    this.#instance.log.info('\tPress CTRL-C to stop 🛑')
    if (debug) {
      this.#instance.log.info(this.#instance.printRoutes(printConfig))
      this.#instance.log.info(this.#instance.printPlugins())
    }

    return this.#instance.server
  }
}
