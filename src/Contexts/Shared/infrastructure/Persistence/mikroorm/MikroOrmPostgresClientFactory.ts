import { EntityCaseNamingStrategy, MikroORM } from '@mikro-orm/core'
import type { Options, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

import { info } from '../../Logger/index.js'
import type { PostgresConfig } from '../postgres/index.js'

export abstract class MikroOrmPostgresClientFactory {
  private static clients: Record<string, MikroORM<PostgreSqlDriver>> = {}

  static async createClient(contextName: string, config: PostgresConfig) {
    let client = MikroOrmPostgresClientFactory.getClient(contextName)
    if (!client) {
      client = await MikroOrmPostgresClientFactory.createAndConnectClient(config)

      MikroOrmPostgresClientFactory.registerClient(contextName, client)
    }
    return client
  }

  private static getClient(contextName: string): Nullable<MikroORM<PostgreSqlDriver>> {
    return MikroOrmPostgresClientFactory.clients[`${contextName}`] || null
  }

  private static async createAndConnectClient(config: PostgresConfig): Promise<MikroORM<PostgreSqlDriver>> {
    const options: Options = {
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      dbName: config.database,
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/mikroorm/postgres/*Entity{.js,.ts}`],
      logger: info,
      type: 'postgresql',
      highlighter: new SqlHighlighter(),
      namingStrategy: EntityCaseNamingStrategy,
      debug: true,
      validate: true,
    }
    const client = await MikroORM.init<PostgreSqlDriver>(options, true)

    return client
  }

  private static registerClient(contextName: string, client: MikroORM<PostgreSqlDriver>): void {
    MikroOrmPostgresClientFactory.clients[`${contextName}`] = client
  }
}
