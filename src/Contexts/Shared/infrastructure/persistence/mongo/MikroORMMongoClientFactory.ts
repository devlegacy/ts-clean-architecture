import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'
import { MongoDriver } from '@mikro-orm/mongodb'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { MongoConfig } from './MongoConfig'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class MikroORMMongoClientFactory {
  private static clients: Record<string, MikroORM<MongoDriver>> = {}
  static async createClient(contextName: string, config: MongoConfig) {
    let client = MikroORMMongoClientFactory.getClient(contextName)
    if (!client) {
      client = await this.createAndConnectClient(contextName, config)
      this.registerClient(contextName, client)
    }
    return client
  }

  private static async createAndConnectClient(
    contextName: string,
    config: MongoConfig
  ): Promise<MikroORM<MongoDriver>> {
    const client = await MikroORM.init<MongoDriver>({
      dbName: contextName,
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
    return MikroORMMongoClientFactory.clients[contextName]
  }

  private static registerClient(contextName: string, client: MikroORM<MongoDriver>): void {
    MikroORMMongoClientFactory.clients[contextName] = client
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
