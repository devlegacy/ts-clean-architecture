import { DomainEvent, EventBus } from '@/Contexts/Shared/domain'

import { DomainEventSubscribers } from '../DomainEventSubscribers'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQEventBus implements EventBus {
  private connection: RabbitMQConnection
  private exchange: string

  constructor(params: { connection: RabbitMQConnection }) {
    this.connection = params.connection
    this.exchange = 'amq.topic'
  }

  addSubscribers(_subscribers: DomainEventSubscribers): void {
    throw new Error('Method not implemented.')
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const routingKey = event.eventName
      const content = this.serialize(event)
      const options = this.options(event)

      await this.connection.publish({
        routingKey,
        content,
        options,
        exchange: this.exchange
      })
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    }
  }

  private serialize(event: DomainEvent): Buffer {
    const eventPrimitives = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        attributes: event.toPrimitives()
      }
    }

    return Buffer.from(JSON.stringify(eventPrimitives))
  }
}
