import { MongoClient, MongoClientOptions } from 'mongodb'

import { info } from '../../Logger'
import { MongoConfig } from './MongoConfig'

export class MongoClientFactory {
  // poll connections
  private static clients: Record<string, MongoClient> = {}

  static async createClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName)
    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config)

      MongoClientFactory.registerClient(contextName, client)
    }

    return client
  }

  private static getClient(contextName: string): MongoClient {
    return MongoClientFactory.clients[`${contextName}`]
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
    const options: MongoClientOptions = {
      monitorCommands: true,
      ignoreUndefined: true,
    }
    const client = new MongoClient(config.url, options)

    // DEBT: Review
    // Read more on: https://www.mongodb.com/docs/drivers/node/current/fundamentals/logging/
    client.on('commandStarted', info).on('commandSucceeded', info).on('commandFailed', info)

    await client.connect()

    return client
  }

  private static registerClient(contextName: string, client: MongoClient): void {
    MongoClientFactory.clients[`${contextName}`] = client
  }
}
