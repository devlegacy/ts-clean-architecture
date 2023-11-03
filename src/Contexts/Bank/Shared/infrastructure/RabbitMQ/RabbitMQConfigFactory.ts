import type { ConnectionSettings, ExchangeSetting } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/index.js'

import config from '../config/index.js'

export type RabbitMQConfig = {
  connectionSettings: ConnectionSettings
  exchangeSettings: ExchangeSetting
  maxRetries: number
  retryTtl: number
}

export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.get('rabbitmq')
  }
}
