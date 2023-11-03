import { AggregateRoot } from '@/Contexts/Shared/domain/index.js'

import { AnalyticAccountConnection } from './AnalyticAccountConnection.js'

export class AnalyticAccount extends AggregateRoot {
  // account id relation
  readonly id: string
  readonly currency: string
  private readonly connections: AnalyticAccountConnection[]

  constructor(id: string, currency: string) {
    super()
    this.id = id
    this.currency = currency
    this.connections = []
  }

  static override fromPrimitives(data: ReturnType<typeof AnalyticAccount.prototype.toPrimitives>): AnalyticAccount {
    const account = new AnalyticAccount(data.id, data.currency)
    const connections = data.connections.map((connection) => AnalyticAccountConnection.fromPrimitives(connection))
    account.connections.push(...connections)

    return account
  }

  addConnection(): void {
    const connection = new AnalyticAccountConnection()
    this.connections.push(connection)
  }

  toPrimitives() {
    const primitive = {
      id: this.id,
      currency: this.currency,
      connections: this.connections.map((connection) => connection.toPrimitives()),
    }
    return primitive
  }
}
