import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'
import type { MongoDriver, Options } from '@mikro-orm/mongodb'

import { info } from '../../Logger'
import { MongoConfig } from '../mongo/MongoConfig'

export abstract class MikroOrmMongoClientFactory {
  static #clients: Record<string, MikroORM<MongoDriver>> = {}

  static async createClient(contextName: string, config: MongoConfig, contextPath?: string) {
    let client = MikroOrmMongoClientFactory.#getClient(contextName)
    if (!client) {
      client = await MikroOrmMongoClientFactory.#createAndConnectClient(contextName, config, contextPath)

      MikroOrmMongoClientFactory.#registerClient(contextName, client)
    }

    return client
  }

  static #getClient(contextName: string): MikroORM<MongoDriver> {
    return MikroOrmMongoClientFactory.#clients[`${contextName}`]
  }

  static async #createAndConnectClient(
    contextName: string,
    config: MongoConfig,
    contextPath?: string
  ): Promise<MikroORM<MongoDriver>> {
    const from = config.url.lastIndexOf('/') + 1
    const to = config.url.lastIndexOf('?')
    const dbName = config.url.substring(from, to < 0 ? config.url.length : to)

    const entities = contextPath
      ? [`${contextPath}/**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`]
      : undefined
    // : [`${__dirname}/../../../../**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`] // DEBT: Convert as env variable

    const options: Options = {
      discovery: {
        warnWhenNoEntities: !!entities,
      },
      // connect: true,
      dbName,
      // tsNode: true,
      clientUrl: config.url,
      entities,
      logger: info,
      type: 'mongo',
      forceUndefined: true,
      highlighter: new MongoHighlighter(),
      debug: true,
      validate: true,
      contextName,
      strict: true,
      implicitTransactions: true, // defaults to false
      // driverOptions: {
      //   monitorCommands: true,
      // ignoreUndefined: true
      //   loggerLevel: 'debug'
      // }
    }
    const client = await MikroORM.init<MongoDriver>(options, true)
    await client.getSchemaGenerator().createSchema()

    return client
  }

  static #registerClient(contextName: string, client: MikroORM<MongoDriver>): void {
    MikroOrmMongoClientFactory.#clients[`${contextName}`] = client
  }
}

// Local test

// MongoClientFactory.createClient('mooc', {
//   url: 'mongodb://127.0.0.1:27017/mooc'
// }).then(async (orm) => {
//   const r = orm.em.fork().getRepository(CourseEntity)
//   console.log(r)

//   const q = await r.find({}, { convertCustomTypes: true })
//   console.log(q)

//   console.log(em)
// })
