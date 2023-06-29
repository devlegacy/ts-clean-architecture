import amqplib from 'amqplib'

import { Uuid } from '@/Contexts/Shared/domain'

import { exitAfterSend, MESSAGES_COUNTER, waitLoop } from '../utils'

const exchangeName = process.env.EXCHANGE || 'my-direct'
const routingKey = process.env.ROUTING_KEY || ''
const exchangeType = 'direct'

console.log({
  exchangeName,
  routingKey,
  exchangeType,
})

const publisher = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertExchange(exchangeName, exchangeType, {})

  await waitLoop(MESSAGES_COUNTER, () => {
    const message = {
      id: Uuid.random().toString(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const buffer = Buffer.from(JSON.stringify(message))

    const sent = channel.publish(exchangeName, routingKey, buffer, {
      persistent: true, // + durable: true
    })

    const responseStatus = sent
      ? `Sent message to <${exchangeName}> exchange`
      : `Fails sending message to <${exchangeName}> exchange`
    console.log(responseStatus, message)
  })
}

publisher()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    exitAfterSend()
  })
