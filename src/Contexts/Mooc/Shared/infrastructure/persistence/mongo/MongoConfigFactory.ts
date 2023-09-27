import type { MongoConfig } from '@/Contexts/Shared/infrastructure/Persistence/mongo/index.js'

import { config } from '../../config/index.js'

const mongoConfig: MongoConfig = {
  url: config.get('mongo.url'),
}

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return mongoConfig
  }
}
