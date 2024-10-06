import amqplib, {
  type ConfirmChannel,
  type Connection,
  type ConsumeMessage,
  type Options,
  type Replies,
} from 'amqplib'
import {
  Service,
} from 'diod'

import {
  info,
} from '../../Logger/index.js'
import type {
  ConnectionSettings,
} from './ConnectionSettings.js'
import type {
  ExchangeSetting,
} from './ExchangeSetting.js'
import {
  RabbitMQExchangeNameFormatter,
} from './RabbitMQExchangeNameFormatter.js'

@Service()
export class RabbitMQConnection {
  protected connectionSettings: ConnectionSettings

  protected channel?: ConfirmChannel
  protected connection?: Connection

  constructor(params: { connectionSettings: ConnectionSettings, exchangeSettings: ExchangeSetting }) {
    this.connectionSettings = params.connectionSettings
  }

  async connect() {
    this.connection = await this.#amqpConnect()
    this.channel = await this.#amqpChannel()
  }

  async exchange(params: { name: string }) {
    return await this.channel?.assertExchange(params.name, 'topic', {
      durable: true,
    })
  }

  async queue(params: {
    exchange: string
    name: string
    routingKeys: string[]
    deadLetterExchange?: string
    deadLetterQueue?: string
    messageTtl?: number
  }) {
    const durable = true
    const exclusive = false
    const autoDelete = false
    const args = this.#getQueueArguments(params)

    // DEBT: Horrible hack
    if (process.env.APP_ENV === 'test' && !params.name.includes('_dummy')) {
      info('-----------> Purge', params.name)
      await this.channel?.purgeQueue(params.name)
    }

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete,
      arguments: args,
    })

    const channels: Promise<Replies.Empty>[] = []
    for (const routingKey of params.routingKeys) {
      channels.push(this.channel!.bindQueue(params.name, params.exchange, routingKey))
    }
    await Promise.all(channels)
  }

  async deleteQueue(queue: string) {
    const response = await this.channel!.deleteQueue(queue)
    return response
  }

  async publish(params: { exchange: string, routingKey: string, content: Buffer, options: Options.Publish }) {
    const {
      routingKey, content, options, exchange,
    } = params
    return new Promise((resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => {
      this.channel!.publish(exchange, routingKey, content, options, (error: unknown) =>
        error ? reject(error) : resolve())
    })
  }

  async close() {
    await this.channel?.close()
    await this.connection?.close()
  }

  async consume(queue: string, onMessage: (message: ConsumeMessage) => void) {
    await this.channel!.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) {
        return
      }

      onMessage(message)
    })
  }

  ack(message: ConsumeMessage) {
    this.channel!.ack(message)
  }

  async retry(message: ConsumeMessage, queue: string, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange)
    const options = this.#getMessageOptions(message)

    return await this.publish({
      exchange: retryExchange,
      routingKey: queue,
      content: message.content,
      options,
    })
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange)
    const options = this.#getMessageOptions(message)

    return await this.publish({
      exchange: deadLetterExchange,
      routingKey: queue,
      content: message.content,
      options,
    })
  }

  #getMessageOptions(message: ConsumeMessage) {
    const {
      messageId, contentType, contentEncoding, priority,
    } = message.properties
    const options = {
      messageId,
      headers: this.#incrementRedeliveryCount(message),
      contentType,
      contentEncoding,
      priority,
    }
    return options
  }

  #incrementRedeliveryCount(message: ConsumeMessage) {
    if (this.#hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count'])
      message.properties.headers['redelivery_count'] = count + 1
    } else {
      message.properties.headers['redelivery_count'] = 1
    }

    return message.properties.headers
  }

  #hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined
  }

  #getQueueArguments(params: {
    exchange: string
    name: string
    routingKeys: string[]
    deadLetterExchange?: string
    deadLetterQueue?: string
    messageTtl?: number
  }) {
    let args: any = {
      // defaults
    }
    if (params.deadLetterExchange) {
      args = {
        ...args,
        'x-dead-letter-exchange': params.deadLetterExchange,
      }
    }
    if (params.deadLetterQueue) {
      args = {
        ...args,
        'x-dead-letter-routing-key': params.deadLetterQueue,
      }
    }
    if (params.messageTtl) {
      args = {
        ...args,
        'x-message-ttl': params.messageTtl,
      }
    }

    return args
  }

  async #amqpConnect() {
    const {
      hostname, port, secure,
    } = this.connectionSettings.connection
    const {
      username, password, vhost,
    } = this.connectionSettings
    const protocol = secure ? 'amqps' : 'amqp'

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost,
    })

    connection
      .on('error', (err: unknown) => {
        info(err, '🐇 Connection error')
        Promise.reject(err)
      })
      .on('close', (err: unknown) => info(err, '🐇 Connection close'))

    return connection
  }

  async #amqpChannel(): Promise<ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel()
    channel
      .on('error', (err: unknown) => info(err, '🐇 Channel error'))
      .on('close', (err: unknown) => info(err, '🐇 Channel close'))

    await channel.prefetch(1)

    return channel
  }
}
