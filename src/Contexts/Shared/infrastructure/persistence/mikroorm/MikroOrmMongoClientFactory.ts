import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'
import type { MongoDriver, Options } from '@mikro-orm/mongodb'

import { info } from '../../Logger'
import { MongoConfig } from '../mongo/MongoConfig'

export abstract class MikroOrmMongoClientFactory {
  private static clients: Record<string, MikroORM<MongoDriver>> = {}

  static async createClient(contextName: string, config: MongoConfig) {
    let client = MikroOrmMongoClientFactory.getClient(contextName)
    if (!client) {
      client = await MikroOrmMongoClientFactory.createAndConnectClient(config)

      MikroOrmMongoClientFactory.registerClient(contextName, client)
    }
    return client
  }

  private static getClient(contextName: string): MikroORM<MongoDriver> {
    return MikroOrmMongoClientFactory.clients[`${contextName}`]
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<MikroORM<MongoDriver>> {
    const from = config.url.lastIndexOf('/') + 1
    const to = config.url.lastIndexOf('?')
    const dbName = config.url.substring(from, to < 0 ? config.url.length : to)

    const options: Options = {
      // connect: true,
      dbName,
      // tsNode: true,
      clientUrl: config.url,
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`],
      logger: info,
      type: 'mongo',
      forceUndefined: true,
      highlighter: new MongoHighlighter(),
      debug: true,
      validate: true,
      // driverOptions: {
      //   monitorCommands: true,
      // ignoreUndefined: true
      //   loggerLevel: 'debug'
      // }
    }
    const client = await MikroORM.init<MongoDriver>(options, true)

    return client
  }

  private static registerClient(contextName: string, client: MikroORM<MongoDriver>): void {
    MikroOrmMongoClientFactory.clients[`${contextName}`] = client
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
