import {
  rabbitConnection,
  rabbitGetQueueBindings,
} from '../utils.js'
// Broadcasts

const queueName = process.env.QUEUE || 'hello'
const exchangeName = process.env.EXCHANGE || 'my-fanout'
const exchangeType = 'fanout'

console.log({
  exchangeName,
  queueName,
})

// first subscribe queue to exchange before publish to exchange
const subscriber = async () => {
  const {
    channel,
    onMessage,
  } = await rabbitConnection()

  const queue = await channel.assertQueue(queueName, {
    durable: true, // default: true
    exclusive: false,
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

  // we need to bind the queue to the exchange to receive messages, it should be done before publishing

  // a queue could be bind to multiple exchanges
  const bind = await channel.bindQueue(queueName, exchangeName, '') // pattern ignored
  console.log({
    bind,
  })
  console.log('Queue bindings', await rabbitGetQueueBindings(queueName))
  // console.log('Exchange info', await getExchangeInfo(exchange))
  // console.log('Exchange bindings', await getExchangeBindings(exchange))

  await channel.consume(
    queueName,
    (message) => onMessage(message, queueName, exchangeName),
    {}
  )
}

// subscriber().catch((err) => {
//   console.log(err)
//   process.exit(1)
// })

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

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/fanout-exchange.ts
