import {
  MongoHighlighter,
} from '@mikro-orm/mongo-highlighter'
import {
  MikroORM,
  MongoDriver,
  type Options,
} from '@mikro-orm/mongodb'

// import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import {
  info,
} from '../../Logger/index.js'
import type {
  MongoConfig,
} from '../mongo/MongoConfig.js'

export abstract class MikroOrmMongoClientFactory {
  static readonly #clients: Record<string, MikroORM> = {}

  static async createClient(
    contextName: string,
    config: MongoConfig,
    contextPath?: string,
  ): Promise<MikroORM> {
    let client = MikroOrmMongoClientFactory.#getClient(contextName)
    if (!client) {
      client = await MikroOrmMongoClientFactory
        .#createAndConnectClient(contextName, config, contextPath)

      MikroOrmMongoClientFactory.#registerClient(contextName, client)
    }

    return client
  }

  static #getClient(contextName: string): Nullable<MikroORM> {
    return MikroOrmMongoClientFactory.#clients[`${contextName}`] || null
  }

  static async #createAndConnectClient(
    contextName: string,
    config: MongoConfig,
    contextPath?: string,
  ): Promise<MikroORM> {
    // const from = config.url.lastIndexOf('/') + 1
    // const to = config.url.lastIndexOf('?')
    // const dbName = config.url.substring(from, to < 0 ? config.url.length : to)
    const dbName = new URL(config.url).pathname.replace('/', '')
    const entities = contextPath
      ? [
          `${contextPath}/**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`,
        ] // blob expression
      : undefined
    // : [`${__dirname}/../../../../**/**/infrastructure/persistence/mikroorm/mongo/*Entity{.js,.ts}`] // DEBT: Convert as env variable

    const options: Options = {
      discovery: {
        warnWhenNoEntities: !!entities,
      },
      // metadataCache: {
      //   enabled: true,
      //   adapter: GeneratedCacheAdapter,
      //   options: { data: await import('./.tmp/metadata.json') },
      // },
      // connect: true,
      dbName,
      tsNode: process.env.APP_ENV !== 'production',
      clientUrl: config.url,
      entities,
      // entities: [`dist/**/*Entity.js`],
      // entitiesTs: [`srs/**/**Entity.ts`],
      logger: info,
      // type: 'mongo',
      // driver: MongoDriver,
      forceUndefined: true,
      highlighter: new MongoHighlighter(),
      // metadataProvider: TsMorphMetadataProvider,
      debug: true,
      validate: true,
      contextName,
      strict: true,
      implicitTransactions: true,
      ensureIndexes: true,
      driver: MongoDriver,
      // driverOptions: {
      // useUnifiedTopology: true,
      // monitorCommands: true,
      // ignoreUndefined: true
      // loggerLevel: 'debug'
      // },
    }
    // console.log(options)
    const client = await MikroORM.init(options)
    await client.schema.createSchema()
    return client
  }

  static #registerClient(contextName: string, client: MikroORM): void {
    MikroOrmMongoClientFactory.#clients[`${contextName}`] = client
  }
}

// Local test
// MikroOrmMongoClientFactory.createClient(
//   'mooc',
//   {
//     url: 'mongodb://127.0.0.1:27017/mooc',
//   },
//   resolve(cwd(), './src/Contexts/Mooc/')
// )
//   .then(async (client) => {
//     const fork = client.em.fork()
//     const db = {
//       course: fork.getRepository(CourseEntity),
//     }

//     let id: null | CourseId = null
//     {
//       const random = CourseMother.random()
//       // @ts-expect-error _id is not defined in Course but in Schema as ObjectId
//       random._id = new ObjectId(random.id.value)
//       // // @ts-expect-error _id is not defined in Course but in Schema as ObjectId string
//       // random._id = new ObjectId(random.id.value).toString()
//       //// @ts-expect-error _id is not defined in Course but in Schema as UUID string
//       // random._id = random.id.value

//       // // @ts-expect-error _id is not defined in Course but in Schema as UUID
//       // random._id = new UUID(random.id.value)
//       const course = await client.em.upsert(CourseEntity, random, {
//         // convertCustomTypes: true,
//         // schema: 'Course',
//       })

//       await client.em.fork().flush()

//       id = random.id
//       console.log(course)
//     }

//     {
//       const random = CourseMother.random()
//       // @ts-expect-error _id is not defined in Course but in Schema
//       random._id = new ObjectId(random.id.value)
//       const course = await db.course.upsert(random)

//       console.log(course)
//     }

//     {
//       // @ts-expect-error _id is not defined in Course but in Schema
//       const course = await db.course.findOne({ _id: new ObjectId(id.value || id), })
//       // await client.em.flush()
//       console.log(course)
//     }

//     const courses = await db.course.find({})
//     console.log(courses)

//     // console.log(em)

//     await db.course.nativeDelete({})
//     await client.close()
//   })
//   .catch((err) => {
//     console.log(err)
//   })
