import {
  env,
} from 'node:process'

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

// import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import {
  info,
} from '../../Logger/index.js'
import type {
  MongoConfig,
} from '../mongo/MongoConfig.js'

export type MikroOrmMongoConnectionClient = Promise<MikroORM<MongoDriver>>

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
    const isProduction = env.APP_ENV === 'production'
    const url = new URL(config.url)
    const dbName = url.pathname.replace('/', '')

    const basePath = `${contextPath}/**/**/infrastructure/persistence/mikroorm/mongo`
    const entities = contextPath
      ? [
          `${basePath}/*Entity.js`,
        ]
      : undefined
    const entitiesTs = contextPath && !isProduction
      ? [
          `${basePath}/*Entity{.js,.ts}`,
        ]
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
      connect: true,
      dbName,
      tsNode: !!entitiesTs,
      clientUrl: config.url,
      entities,
      entitiesTs,
      logger: info,
      highlighter: !isProduction ? new MongoHighlighter() : undefined,
      debug: !isProduction,
      validate: true,
      contextName,
      strict: true,
      implicitTransactions: false, // defaults to false
      ensureIndexes: true,
      driver: MongoDriver,
      forceUndefined: true,
      driverOptions: {
        // useUnifiedTopology: true,
        monitorCommands: true,
        ignoreUndefined: true,
      },
    }
    const client = await MikroORM.init<MongoDriver>(options)
    await client.getSchemaGenerator().createSchema()
    // await client.schema.createSchema()

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
//   resolve(cwd(), './src/Contexts/User/'),
// )
//   .then(async (orm) => {
//   // eslint-disable-next-line no-console
//     console.log(orm)
//     // const r = orm.em.fork().getRepository(CourseEntity)
//     // console.log(r)

//     // const q = await r.find({}, { convertCustomTypes: true })
//     // console.log(q)

//   // console.log(em)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

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
