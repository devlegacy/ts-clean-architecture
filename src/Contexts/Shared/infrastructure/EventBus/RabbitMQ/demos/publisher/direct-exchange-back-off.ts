import amqplib, { Channel, Connection } from 'amqplib'

import { Uuid } from '@/Contexts/Shared/domain'

import { backOff } from '../utils'

const exchangeName = process.env.EXCHANGE || 'my-direct'
const routingKey = process.env.ROUTING_KEY || ''
const delay = process.env.DELAY ? Number(process.env.DELAY) : 2000
const exchangeType = 'direct'

console.log({
  exchangeName,
  routingKey,
  exchangeType,
})

const sendMessage = async (connection: Connection, channel: Channel, message: Record<string, any>) => {
  const messageStringify = JSON.stringify(message)
  const sent = channel.publish(exchangeName, routingKey, Buffer.from(messageStringify), {
    // persistent: true
  })

  if (sent) {
    console.log(`Sent message to <${exchangeName}> exchange`, message)
    return
  }

  console.error({ sent })
  throw new Error(`Fail sending message to <${exchangeName}> exchange, <${messageStringify}>`)
}

const backOffMinTime1MaxTime4 = backOff(1)(4)
const backOffMinTime1MaxTime32 = backOff(1)(32)
const messages: any[] = []

const publisher = async () => {
  const main = async (messages: any[]) => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()

    channel.assertExchange(exchangeName, exchangeType, {
      // durable: true
    })

    const sendMessageTimeout = () => {
      if (messages.length > 0) {
        setTimeout(sendMessageBackOff, delay, connection, channel, messages.shift())
        return
      }

      const message = {
        id: Uuid.random().toString(),
        text: `Hello world! ${new Date().toISOString()}`,
      }

      setTimeout(sendMessageBackOff, delay, connection, channel, message)
    }

    const onErrorEnd = (_: any, ...args: any[]) => {
      connection.close()

      const [, , message] = args
      messages.push(message)

      mainBackOff(messages)
    }

    const sendMessageBackOff = backOffMinTime1MaxTime4(sendMessage, onErrorEnd, sendMessageTimeout, console.error)

    sendMessageTimeout()
  }

  const onErrorEnd = (error: any) => {
    console.error(error)
    mainBackOff(messages)
  }
  const mainBackOff = backOffMinTime1MaxTime32(main, onErrorEnd, console.log, console.error)

  mainBackOff(messages)
}

publisher().catch((err) => {
  console.error(err)
  process.exit(1)
})
// .finally(() => {
//   exitAfterSend()
// })

// ROUTING_KEY=a EXCHANGE=my-direct npx tsnd --transpile-only -r tsconfig-paths/register -r ts-node/register/transpile-only ./@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/direct-exchange-back-off.ts
