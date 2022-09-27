// import { MongoClient, MongoClientOptions } from 'mongodb'

import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'
import { MongoDriver } from '@mikro-orm/mongodb'

// import { logger } from '@/shared/logger'
import { MongoConfig } from './MongoConfig'

// Old implementation

// export class MongoClientFactory {
//   private static clients: Record<string, MongoClient> = {}

//   static async createClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
//     let client = MongoClientFactory.getClient(contextName)
//     if (!client) {
//       client = await MongoClientFactory.createAndConnectClient(config)

//       MongoClientFactory.registerClient(client, contextName)
//     }

//     return client
//   }

//   private static getClient(contextName: string): MongoClient {
//     return MongoClientFactory.clients[contextName]
//   }

//   private static async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
//     const options: MongoClientOptions = {
//       monitorCommands: true,
//       ignoreUndefined: true,
//       loggerLevel: 'debug'
//     }
//     const client = new MongoClient(config.url, options)
//     await client.connect()

//     // TODO: Review
//     // Read more on: https://www.mongodb.com/docs/drivers/node/current/fundamentals/logging/
//     client.on('commandStarted', (event) => logger().info(event))
//     client.on('commandSucceeded', (event) => logger().info(event))
//     client.on('commandFailed', (event) => logger().info(event))

//     return client
//   }

//   private static registerClient(client: MongoClient, contextName: string): void {
//     MongoClientFactory.clients[contextName] = client
//   }
// }
export class MongoClientFactory {
  static async createClient(contextName: string, config: MongoConfig) {
    const orm = await MikroORM.init<MongoDriver>({
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

    return orm
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
