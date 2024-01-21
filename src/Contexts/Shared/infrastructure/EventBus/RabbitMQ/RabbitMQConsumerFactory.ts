import { DomainEvent, type DomainEventSubscriber } from '@/Contexts/Shared/domain/index.js'

import { DomainEventDeserializer } from '../DomainEventDeserializer.js'
import { RabbitMQConnection } from './RabbitMQConnection.js'
import { RabbitMQConsumer } from './RabbitMQConsumer.js'

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMQConnection,
    private maxRetries: number,
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries,
    })
  }
}
