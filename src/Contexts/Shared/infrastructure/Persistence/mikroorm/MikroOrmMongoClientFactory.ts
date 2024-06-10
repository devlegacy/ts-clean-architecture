import {
  MikroORM,
} from '@mikro-orm/core'
import {
  MongoHighlighter,
} from '@mikro-orm/mongo-highlighter'
import {
  MongoDriver,
  type Options,
} from '@mikro-orm/mongodb'

import {
  info,
} from '../../Logger/index.js'
import type {
  MongoConfig,
} from '../mongo/MongoConfig.js'

export abstract class MikroOrmMongoClientFactory {
  static readonly #clients: Record<string, MikroORM<MongoDriver>> = {}

  static async createClient(
    contextName: string,
    config: MongoConfig,
    contextPath?: string,
  ): Promise<MikroORM<MongoDriver>> {
    let client = MikroOrmMongoClientFactory.#getClient(contextName)
    if (!client) {
      client = await MikroOrmMongoClientFactory.#createAndConnectClient(
        contextName,
        config,
        contextPath,
      )

      MikroOrmMongoClientFactory.#registerClient(
        contextName,
        client,
      )
    }

    return client
  }

  static #getClient(contextName: string): Nullable<MikroORM<MongoDriver>> {
    return MikroOrmMongoClientFactory.#clients[`${contextName}`] || null
  }

  static async #createAndConnectClient(
    contextName: string,
    config: MongoConfig,
    contextPath?: string,
  ): Promise<MikroORM<MongoDriver>> {
    const from = config.url.lastIndexOf('/') + 1
    const to = config.url.lastIndexOf('?')
    const dbName = config.url.substring(
      from,
      to < 0 ? config.url.length : to,
    )

    const entities = contextPath
      ? [
          `${contextPath}/**/**/infrastructure/persistence/mikroorm/mongo/*Entity.js`,
        ]
      : undefined
    const entitiesTs = [
      `${contextPath}/**/**/infrastructure/persistence/mikroorm/mongo/*Entity.ts`,
    ]
    // : [`${__dirname}/../../../../**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`] // DEBT: Convert as env variable

    const options: Options = {
      discovery: {
        warnWhenNoEntities: false,
      },
      // connect: true,
      dbName,
      tsNode: true,
      clientUrl: config.url,
      entities,
      entitiesTs,
      logger: info,
      // type: 'mongo',
      forceUndefined: true,
      highlighter: new MongoHighlighter(),
      debug: true,
      validate: true,
      contextName,
      strict: true,
      // implicitTransactions: true, // defaults to false
      implicitTransactions: false, // defaults to false
      ensureIndexes: true,
      driver: MongoDriver,
      // driverOptions: {
      // useUnifiedTopology: true,
      //   monitorCommands: true,
      // ignoreUndefined: true
      //   loggerLevel: 'debug'
      // },
    }
    const client = await MikroORM.init<MongoDriver>(options)
    await client.getSchemaGenerator().createSchema()

    return client
  }

  static #registerClient(contextName: string, client: MikroORM<MongoDriver>): void {
    MikroOrmMongoClientFactory.#clients[`${contextName}`] = client
  }
}

// Local test
// MikroOrmMongoClientFactory.createClient(
//   'mooc',
//   {
//     url: 'mongodb://127.0.0.1:27017/mooc',
//   },
//   resolve(cwd(), './src/Contexts/User/')
// ).then(async (orm) => {
//   console.log(orm)
//   // const r = orm.em.fork().getRepository(CourseEntity)
//   // console.log(r)

//   // const q = await r.find({}, { convertCustomTypes: true })
//   // console.log(q)

//   // console.log(em)
// })
