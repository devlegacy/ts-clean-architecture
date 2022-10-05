import { ApolloServer } from 'apollo-server-fastify'
import { FastifyInstance } from 'fastify'
import { AddressInfo } from 'net'

import { config, FastifyAdapter } from '@/Contexts/Shared/infrastructure'

import schema from './schema'

export class GraphQL {
  #port: number
  #app: FastifyInstance
  #apolloServer: ApolloServer
  // private _httpServer?: any

  constructor(port = 8080) {
    this.#port = port

    const adapter = new FastifyAdapter()

    this.#app = adapter.instance

    this.#apolloServer = new ApolloServer({
      schema
    })
  }

  async listen() {
    await this.#apolloServer.start()
    this.#app.register(this.#apolloServer.createHandler())

    await this.#app.listen({
      port: this.#port,
      host: '0.0.0.0'
    })

    const address: AddressInfo = this.#app.server.address() as AddressInfo

    this.#app.log.info(
      `🚀 GraphQl Server running on: http://localhost:${address.port}${this.#apolloServer.graphqlPath}`
    )
    this.#app.log.info('    Press CTRL-C to stop 🛑')

    const APP_DEBUG = config.get<boolean>('APP_DEBUG', false)
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
