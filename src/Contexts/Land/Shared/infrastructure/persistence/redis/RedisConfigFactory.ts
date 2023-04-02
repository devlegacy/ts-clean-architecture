import { RedisConfig } from '@/Contexts/Shared/infrastructure'

import config from '../../config'

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
