import TypeOrmConfig from '@/Contexts/Shared/infrastructure/persistance/typeorm/typeorm-config'

import config from '../../config'

const typeOrmConfig: TypeOrmConfig = {
  host: config.get('typeorm.host'),
  port: config.get('typeorm.port'),
  username: config.get('typeorm.username'),
  password: config.get('typeorm.password'),
  database: config.get('typeorm.database')
}

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return typeOrmConfig
  }
}
