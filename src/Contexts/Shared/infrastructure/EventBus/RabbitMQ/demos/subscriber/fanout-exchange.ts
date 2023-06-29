import amqplib from 'amqplib'

import { intensiveOperation } from '../utils'

const queueName = process.env.QUEUE || 'hello'
const exchangeName = process.env.EXCHANGE || 'my-fanout'
const exchangeType = 'fanout'

console.log({
  exchangeName,
  queueName,
})

const subscriber = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const queue = await channel.assertQueue(queueName, {})
  console.log(queue)
  await channel.assertExchange(exchangeName, exchangeType, {})
  await channel.bindQueue(queueName, exchangeName, '')
  await channel.consume(queueName, (message) => {
    if (!message) return
    const content = JSON.parse(message.content.toString())
    intensiveOperation()
    // con el noAck pueden haber duplicados
    console.log(`Received message from <${queueName}> queue`, content)
    channel.ack(message)
  })
}

subscriber().catch((err) => {
  console.log(err)
  process.exit(1)
})
