import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'
import { MongoDriver } from '@mikro-orm/mongodb'

import { MongoConfig } from '../mongo/MongoConfig'

export abstract class MikroOrmMongoClientFactory {
  private static clients: Record<string, MikroORM<MongoDriver>> = {}
  static async createClient(contextName: string, config: MongoConfig) {
    let client = MikroOrmMongoClientFactory.getClient(contextName)
    if (!client) {
      client = await this.createAndConnectClient(config)
      this.registerClient(contextName, client)
    }
    return client
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<MikroORM<MongoDriver>> {
    const client = await MikroORM.init<MongoDriver>({
      clientUrl: config.url,
      type: 'mongo',
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/mongo/*Entity{.js,.ts}`],
      forceUndefined: true,
      highlighter: new MongoHighlighter(),
      debug: true,
      validate: true,
      driverOptions: {
        //   monitorCommands: true,
        ignoreUndefined: true
        //   loggerLevel: 'debug'
      }
    })
    return client
  }

  private static getClient(contextName: string): MikroORM<MongoDriver> {
    return MikroOrmMongoClientFactory.clients[contextName]
  }

  private static registerClient(contextName: string, client: MikroORM<MongoDriver>): void {
    MikroOrmMongoClientFactory.clients[contextName] = client
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
