import { DomainEvent, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { DomainEventDeserializer } from '../DomainEventDeserializer'
import { RabbitMQConnection } from './RabbitMQConnection'
import { RabbitMQConsumer } from './RabbitMQConsumer'

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMQConnection,
    private maxRetries: number
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries
    })
  }
}
