import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify'
import { FastifyInstance } from 'fastify'
import { AddressInfo } from 'net'

import { FastifyAdapter } from '@/Contexts/Shared/infrastructure/platform-fastify'

import schema from './schema'

export class GraphQL {
  #port: number
  #app: FastifyInstance
  #apolloServer: ApolloServer
  // private _httpServer?: any

  constructor(port = 8080) {
    this.#port = port

    const adapter = new FastifyAdapter()

    this.#app = adapter.app

    this.#apolloServer = new ApolloServer<BaseContext>({
      schema,
      plugins: [fastifyApolloDrainPlugin(this.#app)],
    })
  }

  async listen() {
    await this.#apolloServer.start()
    this.#app.register(fastifyApollo(this.#apolloServer))

    await this.#app.listen({
      port: this.#port,
      host: '0.0.0.0',
    })

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(`🚀 GraphQl Server running on: http://localhost:${address.port}/graphql`)
    this.#app.log.info('    Press CTRL-C to stop 🛑')

    const APP_DEBUG = true
    if (APP_DEBUG) {
      this.#app.log.info(this.#app.printRoutes())
    }
  }

  getHttpServer() {
    return this.#app.server
  }

  stop() {
    try {
      this.#app.server.close()
    } catch (e) {
      this.#app.log.error(e)
    }
  }
}
