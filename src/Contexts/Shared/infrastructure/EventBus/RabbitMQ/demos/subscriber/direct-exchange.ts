import amqplib from 'amqplib'

import { intensiveOperation } from '../utils.js'

const queue = process.env.QUEUE || 'hello'
const exchange = process.env.EXCHANGE || 'my-direct'
// const routingKey = process.env.ROUTING_KEY || ''
const pattern = process.env.PATTERN || ''
const exchangeType = 'direct'

console.log({
  queue,
  exchange,
  // routingKey === pattern,
  pattern,
})

const subscriber = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const assertQueue = await channel.assertQueue(queue, {})
  console.log(assertQueue)
  await channel.assertExchange(exchange, exchangeType, {})
  await channel.bindQueue(queue, exchange, pattern)
  await channel.consume(queue, (message) => {
    if (!message) return
    const content = JSON.parse(message.content.toString())
    intensiveOperation()
    // con el noAck pueden haber duplicados
    console.log(`Received message from <${queue}> queue`, content)
    channel.ack(message)
  })
}

subscriber().catch((err) => {
  console.log(err)
  process.exit(1)
})
