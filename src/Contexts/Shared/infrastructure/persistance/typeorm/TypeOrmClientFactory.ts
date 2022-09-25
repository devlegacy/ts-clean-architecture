import { DataSource } from 'typeorm'

import { TypeOrmConfig } from './TypeOrmConfig'

export class TypeOrmClientFactory {
  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    // try {
    const AppDataSource = new DataSource({
      applicationName: contextName,
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: true,
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistance/typeorm/*{.js,.ts}`]
      // subscribers: [],
      // migrations: []
    })

    return await AppDataSource.initialize()
    // } catch (error) {
    //   return
    // }
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
