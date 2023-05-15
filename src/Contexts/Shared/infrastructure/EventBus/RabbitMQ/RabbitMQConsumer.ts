import { ConsumeMessage } from 'amqplib'

import { DomainEvent, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { DomainEventDeserializer } from '../DomainEventDeserializer'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQConsumer {
  private subscriber: DomainEventSubscriber<DomainEvent>
  private deserializer: DomainEventDeserializer
  private connection: RabbitMQConnection
  private maxRetries: number
  private queueName: string
  private exchange: string

  constructor(params: {
    subscriber: DomainEventSubscriber<DomainEvent>
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
      await this.#handleError(message)
    } finally {
      this.connection.ack(message)
    }
  }

  async #handleError(message: ConsumeMessage) {
    if (this.#hasBeenRedeliveredTooMuch(message)) {
      await this.#deadLetter(message)
    } else {
      await this.#retry(message)
    }
  }

  async #retry(message: ConsumeMessage) {
    await this.connection.retry(message, this.queueName, this.exchange)
  }

  async #deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queueName, this.exchange)
  }

  #hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (this.#hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count'])
      return count >= this.maxRetries
    }
    return false
  }

  #hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined
  }
}
