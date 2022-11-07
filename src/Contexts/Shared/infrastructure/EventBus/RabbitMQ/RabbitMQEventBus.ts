import { Options } from 'amqplib'

import { DomainEvent, EventBus } from '@/Contexts/Shared/domain'

import { DomainEventDeserializer } from '../DomainEventDeserializer'
import { MikroOrmMongoDomainEventFailoverPublisher } from '../DomainEventFailoverPublisher'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer'
import { DomainEventSubscribers } from '../DomainEventSubscribers'
import { RabbitMQConnection } from './RabbitMQConnection'
import { RabbitMQConsumerFactory } from './RabbitMQConsumerFactory'
import { RabbitMQQueueFormatter } from './RabbitMQQueueFormatter'

export class RabbitMQEventBus implements EventBus {
  private failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher
  private connection: RabbitMQConnection
  private exchange: string
  private queueNameFormatter: RabbitMQQueueFormatter
  private maxRetries: number

  constructor(params: {
    connection: RabbitMQConnection
    exchange: string
    failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher
    maxRetries: number
    queueNameFormatter: RabbitMQQueueFormatter
  }) {
    const { failoverPublisher, connection, exchange, queueNameFormatter, maxRetries } = params
    this.connection = connection
    this.exchange = exchange ?? 'amq.topic'
    this.failoverPublisher = failoverPublisher
    this.maxRetries = maxRetries
    this.queueNameFormatter = queueNameFormatter
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers)
    const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries)

    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber)
      const rabbitMQConsumer = consumerFactory.build(subscriber, this.exchange, queueName)

      await this.connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer))
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName
        const content = this.toBuffer(event)
        const options = this.options(event)

        await this.connection.publish({
          routingKey,
          content,
          options,
          exchange: this.exchange
        })
      } catch (error: any) {
        await this.failoverPublisher.publish(event)
      }
    }
  }

  private options(event: DomainEvent): Options.Publish {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    }
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event)

    return Buffer.from(eventPrimitives)
  }
}
