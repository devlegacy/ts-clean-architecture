import { DomainEvent, EventBus } from '@/Contexts/Shared/domain'

import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer'
import { DomainEventSubscribers } from '../DomainEventSubscribers'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQEventBus implements EventBus {
  private failoverPublisher: DomainEventFailoverPublisher
  private connection: RabbitMQConnection
  private exchange: string

  constructor(params: {
    failoverPublisher: DomainEventFailoverPublisher
    connection: RabbitMQConnection
    exchange: string
  }) {
    const { failoverPublisher, connection, exchange } = params
    this.failoverPublisher = failoverPublisher
    this.connection = connection
    this.exchange = exchange ?? 'amq.topic'
  }

  addSubscribers(_subscribers: DomainEventSubscribers): void {
    throw new Error('Method not implemented.')
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

  private options(event: DomainEvent) {
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
