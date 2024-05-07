import {
  rabbitConnection,
} from '../utils.js'

const queueName = process.env.QUEUE || 'hello'
const exchangeName = process.env.EXCHANGE || 'my-topic'
// const routingKey = process.env.ROUTING_KEY || ''
const pattern = process.env.PATTERN || ''
const exchangeType = 'topic'

console.log({
  queueName,
  exchangeName,
  exchangeType,
  pattern,
})

const subscriber = async () => {
  const {
    channel,
    onMessage,
  } = await rabbitConnection()

  const queue = await channel.assertQueue(queueName, {
    exclusive: false, // can be consumed by one or more than one
    durable: true,
    autoDelete: false,
  })
  console.log({
    queue,
  })
  const exchange = await channel.assertExchange(exchangeName, exchangeType, {
    durable: true,
  })
  console.log({
    exchange,
  })
  const bind = await channel.bindQueue(queueName, exchangeName, pattern)
  console.log({
    bind,
  })
  const consume = await channel.consume(queueName, (message) => onMessage(message, queueName, exchangeName))
  console.log({
    consume,
  })
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

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/topic-exchange.ts

// PATTERN=user.* EXCHANGE=domain_events QUEUE=user_events bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/topic-exchange.ts

// PATTERN=log.* QUEUE=hello bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/topic-exchange.ts
