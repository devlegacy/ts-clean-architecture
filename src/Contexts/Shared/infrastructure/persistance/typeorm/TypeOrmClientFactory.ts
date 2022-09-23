import { DataSource } from 'typeorm'

import TypeOrmConfig from './TypeOrmConfig'

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
