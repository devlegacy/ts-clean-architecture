import fastifyCompress from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'
// import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
import Fastify, {
  FastifyError,
  FastifyInstance,
  FastifyRegister,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
  PrintRoutesOptions,
} from 'fastify'
import { AddressInfo } from 'net'

import { Monitoring } from '../../domain'
import { ControllerResolver } from '../Common'
import { bootstrap } from './bootstrap'
import { ValidationModule } from './interfaces'

const printConfig: PrintRoutesOptions = {
  commonPrefix: false,
  includeHooks: true,
  includeMeta: true, // ['metaProperty']
}

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
  readonly validations: ValidationModule<any>[] = []
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

  setValidationModule<T = unknown>(validationModule: ValidationModule<T>) {
    this.validations.push(validationModule)

    return this
  }

  setMonitoringModule(monitoring: Monitoring) {
    this.#monitoring = monitoring

    return this
  }

  async bootstrap(props: {
    controller: string | any[]
    isProduction: boolean
    prefix?: string
    resolver?: ControllerResolver
    container?: any
  }) {
    this.#instance.setValidatorCompiler((schemaDefinition: any): any => {
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
    this.#instance.setErrorHandler((error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
      this.#monitoring?.capture(error, { req })
      for (const m of this.validations) {
        if (res.sent) break
        m.errorHandler(error, req, res)
      }
    })

    await bootstrap(this, props)
  }

  public register<TRegister extends Parameters<FastifyRegister<FastifyInstance>>>(
    plugin: TRegister['0'],
    opts?: TRegister['1']
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
    env?: string
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
    if (debug) this.#instance.log.info(this.#instance.printRoutes(printConfig))

    return this.#instance.server
  }
}
