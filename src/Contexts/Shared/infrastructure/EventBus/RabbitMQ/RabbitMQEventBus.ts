import { Options } from 'amqplib'

import { DomainEvent, DomainEventSubscribers, EventBus } from '@/Contexts/Shared/domain'

import { info } from '../../Logger'
import { DomainEventDeserializer } from '../DomainEventDeserializer'
import {
  MikroOrmMongoDomainEventFailoverPublisher,
  MongoDomainEventFailoverPublisher,
} from '../DomainEventFailoverPublisher'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer'
import { RabbitMQConnection } from './RabbitMQConnection'
import { RabbitMQConsumerFactory } from './RabbitMQConsumerFactory'
import { RabbitMQQueueFormatter } from './RabbitMQQueueFormatter'

export class RabbitMQEventBus implements EventBus {
  #failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher | MongoDomainEventFailoverPublisher
  #connection: RabbitMQConnection
  #exchange: string
  #queueNameFormatter: RabbitMQQueueFormatter
  #maxRetries: number

  constructor(params: {
    connection: RabbitMQConnection
    exchange: string
    failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher | MongoDomainEventFailoverPublisher
    maxRetries: number
    queueNameFormatter: RabbitMQQueueFormatter
  }) {
    const { failoverPublisher, connection, exchange, queueNameFormatter, maxRetries } = params
    this.#connection = connection
    this.#exchange = exchange ?? 'amq.topic'
    this.#failoverPublisher = failoverPublisher
    this.#maxRetries = maxRetries
    this.#queueNameFormatter = queueNameFormatter
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers)
    const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.#connection, this.#maxRetries)

    for (const subscriber of subscribers.items) {
      const queueName = this.#queueNameFormatter.format(subscriber)
      const rabbitMQConsumer = consumerFactory.build(subscriber, this.#exchange, queueName)

      await this.#connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer))
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      info(`[emit 📤 ]: ${event.eventName}`)
      try {
        const routingKey = event.eventName
        const content = this.#serialize(event)
        const options = this.#options(event)

        await this.#connection.publish({
          routingKey,
          content,
          options,
          exchange: this.#exchange,
        })
      } catch (error: unknown) {
        await this.#failoverPublisher.publish(event)
      }
    }
  }

  #options(event: DomainEvent): Options.Publish {
    const options: Options.Publish = {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    }
    return options
  }

  #serialize(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event)
    const buffer = Buffer.from(eventPrimitives)
    return buffer
  }
}
