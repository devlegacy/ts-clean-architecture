import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { PostgresConfig } from '../postgres'

export class TypeOrmPostgresClientFactory {
  static #clients: Record<string, DataSource> = {}

  private constructor() {
    // do nothing
  }

  static async createClient(contextName: string, config: PostgresConfig) {
    let client = TypeOrmPostgresClientFactory.#getClient(contextName)
    if (!client) {
      client = await TypeOrmPostgresClientFactory.#createAndConnectClient(contextName, config)

      TypeOrmPostgresClientFactory.#registerClient(contextName, client)
    }
    return !client.isInitialized ? await client.initialize() : client
  }

  static #getClient(contextName: string): DataSource {
    return TypeOrmPostgresClientFactory.#clients[`${contextName}`]
  }

  static async #createAndConnectClient(contextName: string, config: PostgresConfig): Promise<DataSource> {
    // try {
    const options: PostgresConnectionOptions = {
      applicationName: contextName,
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true, // DEBT: handle in prod (false) and dev (true)
      logging: true,
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
      // subscribers: [],
      // migrations: []
    }
    const AppDataSource = new DataSource(options)

    const client = await AppDataSource.initialize()
    return client
    // } catch (error) {
    //   return {} as DataSource
    // }
  }

  static #registerClient(contextName: string, client: DataSource): void {
    TypeOrmPostgresClientFactory.#clients[`${contextName}`] = client
  }
}

// Local test

// TypeOrmClientFactory.createClient('mooc', {
//   host: '127.0.0.1',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'mooc'
// }).then(async (source) => {
//   // eslint-disable-next-line no-console
//   console.log(source)

//   const r = source.getRepository(CourseEntity)
//   console.log(r)

//   const q = await r.find()

//   console.log(q)

//   const q2 = await r.insert(
//     Course.fromPrimitives({
//       id: Uuid.random().toString(),
//       name: 'x',
//       duration: 'x'
//     })
//   )

//   console.log(q2)

//   const q3 = await r.find()

//   console.log(q3)

//   const q4 = await r.findOne({ where: q2.identifiers[0] })

//   console.log(q4)
// })
