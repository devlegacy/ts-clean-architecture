// Broadcasts

import { rabbitConnection, rabbitGetQueueBindings } from '../utils.js'

const queue = process.env.QUEUE || 'hello'
const exchange = process.env.EXCHANGE || 'my-fanout'
const exchangeType = 'fanout'

console.log({
  exchange,
  queue,
})

// first subscribe queue to exchange before publish to exchange
const subscriber = async () => {
  const { channel, onMessage } = await rabbitConnection()

  const assertQueue = await channel.assertQueue(queue, {
    durable: true, // default: true
    exclusive: false,
    autoDelete: false,
  })
  console.log(assertQueue)
  await channel.assertExchange(exchange, exchangeType, {
    durable: true,
  })

  await channel.bindQueue(queue, exchange, '') // pattern ignored
  console.log('Queue bindings', await rabbitGetQueueBindings(queue))
  // console.log('Exchange info', await getExchangeInfo(exchange))
  // console.log('Exchange bindings', await getExchangeBindings(exchange))

  await channel.consume(
    queue,
    (message) => {
      if (!message) return
      onMessage(message, queue)
    },
    {},
  )
}

// subscriber().catch((err) => {
//   console.log(err)
//   process.exit(1)
// })

try {
  await subscriber()
} catch (err) {
  console.error(err)
  process.exit(1)
} finally {
  console.log('finally')
}
