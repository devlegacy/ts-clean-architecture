import { rabbitConnection } from '../utils.js'

const queue = process.env.QUEUE || 'hello'

console.log({
  queue,
})

const subscriber = async () => {
  const { channel, onMessage } = await rabbitConnection()

  // create queue if not exists
  const assertQueue = await channel.assertQueue(queue, {
    durable: true, // default: true
    exclusive: false,
    autoDelete: false,
  })
  console.log(assertQueue)

  const consume = await channel.consume(
    queue,
    (message) => {
      if (!message) return
      onMessage(message, queue)
    },
    {
      // Se debe evitar en la medida de lo posible el valor a true, para prevenir perdida de mensajes
      // noAck: true,
      noAck: false, // default: false // reconocer | confirmar - acknowledgement

      // when you set noAck to true it means automatic acknowledgement of messages, even if the worker is not able to process the message it will be deleted from the queue,

      // when you set noAck to false that means until you manually acknowledge that you have successfully processed/acknowledged the message, it will remain in the queue and after certain amount of time it will be requeued and delivered to a different consumer
    },
  )
  console.log(consume)
}

try {
  await subscriber()
} catch (err) {
  console.error(err)
  process.exit(1)
} finally {
  console.log('finally')
}
// node --watch --loader ts-paths-esm-loader/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/queues.ts
