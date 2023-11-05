import {
  DomainEvent,
  type DomainEventClass,
  type DomainEventSubscriber,
  EVENTS_HANDLER_METADATA,
} from '@/Contexts/Shared/domain/index.js'

import { RabbitMQConnection } from './RabbitMQConnection.js'
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter.js'
import { RabbitMQQueueFormatter } from './RabbitMQQueueFormatter.js'

export class RabbitMQConfigurer {
  #connection: RabbitMQConnection
  #queueNameFormatter: RabbitMQQueueFormatter
  #messageRetryTtl: number
  constructor(connection: RabbitMQConnection, queueNameFormatter: RabbitMQQueueFormatter, messageRetryTtl: number) {
    this.#connection = connection
    this.#queueNameFormatter = queueNameFormatter
    this.#messageRetryTtl = messageRetryTtl
  }

  async configure(params: { exchange: string; subscribers: DomainEventSubscriber<DomainEvent>[] }): Promise<void> {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(params.exchange)
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(params.exchange)

    await this.#connection.exchange({ name: params.exchange })
    await this.#connection.exchange({ name: retryExchange })
    await this.#connection.exchange({ name: deadLetterExchange })

    const queues: Promise<void>[] = []
    for (const subscriber of params.subscribers) {
      queues.push(this.#addQueue(subscriber, params.exchange))
    }
    await Promise.all(queues)
  }

  async #addQueue(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange)
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange)

    const routingKeys = this.#getRoutingKeysFor(subscriber)

    const queue = this.#queueNameFormatter.format(subscriber)
    const deadLetterQueue = this.#queueNameFormatter.formatDeadLetter(subscriber)
    const retryQueue = this.#queueNameFormatter.formatRetry(subscriber)

    await Promise.all([
      this.#connection.queue({
        routingKeys,
        name: queue,
        exchange,
      }),
      this.#connection.queue({
        routingKeys: [queue],
        name: retryQueue,
        exchange: retryExchange,
        messageTtl: this.#messageRetryTtl,
        deadLetterExchange: exchange,
        deadLetterQueue: queue,
      }),
      this.#connection.queue({
        routingKeys: [queue],
        name: deadLetterQueue,
        exchange: deadLetterExchange,
      }),
    ])
    // await this.connection.queue({
    //   routingKeys,
    //   name: queue,
    //   exchange,
    // })
    // await this.connection.queue({
    //   routingKeys: [queue],
    //   name: retryQueue,
    //   exchange: retryExchange,
    //   messageTtl: this.messageRetryTtl,
    //   deadLetterExchange: exchange,
    //   deadLetterQueue: queue,
    // })
    // await this.connection.queue({
    //   routingKeys: [queue],
    //   name: deadLetterQueue,
    //   exchange: deadLetterExchange,
    // })
  }

  #getRoutingKeysFor(subscriber: DomainEventSubscriber<DomainEvent>) {
    const events: DomainEventClass[] = Reflect.getMetadata(EVENTS_HANDLER_METADATA, subscriber.constructor) ?? []
    const routingKeys = events.map((event) => event.EVENT_NAME)

    const queue = this.#queueNameFormatter.format(subscriber)
    routingKeys.push(queue)

    return routingKeys
  }
}
