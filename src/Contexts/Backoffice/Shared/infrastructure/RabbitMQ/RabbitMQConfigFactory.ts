import { ConnectionSettings, ExchangeSetting } from '@/Contexts/Shared/infrastructure/EventBus'

import config from '../config'

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
