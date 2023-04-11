import { ConsumeMessage } from 'amqplib'

import { DomainEvent, IDomainEventSubscriber } from '@/Contexts/Shared/domain'

import { DomainEventDeserializer } from '../DomainEventDeserializer'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQConsumer {
  private subscriber: IDomainEventSubscriber<DomainEvent>
  private deserializer: DomainEventDeserializer
  private connection: RabbitMQConnection
  private maxRetries: number
  private queueName: string
  private exchange: string

  constructor(params: {
    subscriber: IDomainEventSubscriber<DomainEvent>
    deserializer: DomainEventDeserializer
    connection: RabbitMQConnection
    queueName: string
    exchange: string
    maxRetries: number
  }) {
    const { subscriber, deserializer, connection, maxRetries, queueName, exchange } = params
    this.subscriber = subscriber
    this.deserializer = deserializer
    this.connection = connection
    this.maxRetries = maxRetries
    this.queueName = queueName
    this.exchange = exchange
  }

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString()
    const domainEvent = this.deserializer.deserialize(content)

    try {
      await this.subscriber.on(domainEvent)
    } catch (error) {
      await this.handleError(message)
    } finally {
      this.connection.ack(message)
    }
  }

  private async handleError(message: ConsumeMessage) {
    if (this.hasBeenRedeliveredTooMuch(message)) {
      await this.deadLetter(message)
    } else {
      await this.retry(message)
    }
  }

  private async retry(message: ConsumeMessage) {
    await this.connection.retry(message, this.queueName, this.exchange)
  }

  private async deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queueName, this.exchange)
  }

  private hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count'])
      return count >= this.maxRetries
    }
    return false
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined
  }
}
