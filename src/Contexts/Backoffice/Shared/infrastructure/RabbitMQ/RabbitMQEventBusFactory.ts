import { RabbitMQConnection, RabbitMQEventBus, RabbitMQQueueFormatter } from '@/Contexts/Shared/infrastructure/EventBus'
import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { RabbitMQConfig } from './RabbitMQConfigFactory'

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher,
    connection: RabbitMQConnection,
    queueNameFormatter: RabbitMQQueueFormatter,
    config: RabbitMQConfig
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
