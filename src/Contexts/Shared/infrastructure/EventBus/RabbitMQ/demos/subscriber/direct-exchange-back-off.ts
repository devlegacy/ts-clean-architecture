import amqplib from 'amqplib'

import { backOff, intensiveOperation } from '../utils.js'

const queueName = process.env.QUEUE || 'hello'
const exchangeName = process.env.EXCHANGE || 'my-direct'
// const routingKey = process.env.ROUTING_KEY || ''
const pattern = process.env.PATTERN || ''
const exchangeType = 'direct'

console.log({
  queueName,
  exchangeName,
  // routingKey === pattern,
  pattern,
})

const backOffMinTime1MaxTime4 = backOff(1)(4)
const subscriber = async () => {
  const main = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()

    channel.on('close', () => {
      mainBackOff()
    })
    const queue = await channel.assertQueue(queueName, { durable: true })
    console.log(queue)
    await channel.assertExchange(exchangeName, exchangeType, {
      // durable: true
    })
    await channel.bindQueue(queueName, exchangeName, pattern)
    await channel.consume(queueName, (message) => {
      if (!message) return
      const content = JSON.parse(message.content.toString())
      console.log(`Received message from <${queueName}> queue`, content)
      intensiveOperation()
      console.log('--> DONE!')
      // con el noAck pueden haber duplicados
      channel.ack(message)
    })
  }

  const onErrorEnd = (error: any) => {
    console.error(error)
    mainBackOff() //.catch(console.error)
  }
  const mainBackOff = backOffMinTime1MaxTime4(main, onErrorEnd, console.log, console.error)

  mainBackOff()
}

subscriber().catch((err) => {
  console.log(err)
  process.exit(1)
})

// PATTERN=a EXCHANGE=my-direct QUEUE=first npx tsnd --transpile-only -r tsconfig-paths/register -r ts-node/register/transpile-only ./@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/direct-exchange-back-off.ts
