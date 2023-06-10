import { MongoConfig } from '@/Contexts/Shared/infrastructure/persistence/mongo'

import { config } from '../../config'

const mongoConfig: MongoConfig = {
  url: config.get('mongo.url'),
}

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return mongoConfig
  }
}
