import {
  type RedisConfig,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

import config from '../../config/index.js'

const redisConfig: RedisConfig = {
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password'),
}

export class RedisConfigFactory {
  static createConfig(): RedisConfig {
    return redisConfig
  }
}
