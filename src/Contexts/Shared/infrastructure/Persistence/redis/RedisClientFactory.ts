import { Redis } from 'ioredis'

import type { RedisConfig } from './RedisConfig.js'

export class RedisClientFactory {
  private static clients: { [key: string]: Redis } = {}

  static createClient(contextName: string, config: RedisConfig): Redis {
    let client = RedisClientFactory.getClient(contextName)

    if (!client) {
      client = RedisClientFactory.createAndConnectClient(config)

      RedisClientFactory.registerClient(client, contextName)
    }

    return client
  }

  private static getClient(contextName: string): Nullable<Redis> {
    return RedisClientFactory.clients[`${contextName}`] || null
  }

  private static createAndConnectClient(config: RedisConfig): Redis {
    const client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
    })

    return client
  }

  private static registerClient(client: Redis, contextName: string): void {
    RedisClientFactory.clients[`${contextName}`] = client
  }
}
