import '../modules/index.js'

import {
  GraphQL,
} from './GraphQL.js'

export class UserGraphQLApp {
  graphQL?: GraphQL

  async start() {
    const port = 2427
    this.graphQL = new GraphQL(port)

    return await this.graphQL.listen()
  }

  stop() {
    this.graphQL?.stop()
  }
}
