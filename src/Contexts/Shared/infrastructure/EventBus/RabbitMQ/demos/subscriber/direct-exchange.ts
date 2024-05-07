import {
  rabbitConnection,
} from '../utils.js'

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

const subscriber = async () => {
  const {
    channel,
    onMessage,
  } = await rabbitConnection()

  const queue = await channel.assertQueue(queueName, {})
  console.log({
    queue,
  })
  const exchange = await channel.assertExchange(exchangeName, exchangeType, {})
  console.log({
    exchange,
  })
  const bind = await channel.bindQueue(queueName, exchangeName, pattern)
  console.log({
    bind,
  })
  await channel.consume(queueName, (message) => onMessage(message, queueName, exchangeName))
}

try {
  await subscriber()
}
catch (err) {
  console.error(err)
  process.exit(1)
}
finally {
  console.log('finally 🔚')
}

// subscriber().catch((err) => {
//   console.log(err)
//   process.exit(1)
// })
// PATTERN= bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/direct-exchange.ts
