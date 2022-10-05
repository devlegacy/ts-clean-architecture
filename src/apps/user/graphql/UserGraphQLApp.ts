import '../dependency-injection'

import { GraphQL } from './GraphQL'

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
