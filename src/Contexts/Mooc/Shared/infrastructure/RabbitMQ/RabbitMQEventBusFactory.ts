import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/index.js'
import {
  RabbitMQConnection,
  RabbitMQEventBus,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure/EventBus/index.js'

import type { RabbitMQConfig } from './RabbitMQConfigFactory.js'

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher,
    connection: RabbitMQConnection,
    queueNameFormatter: RabbitMQQueueFormatter,
    config: RabbitMQConfig,
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter,
      maxRetries: config.maxRetries,
    })
  }
}
