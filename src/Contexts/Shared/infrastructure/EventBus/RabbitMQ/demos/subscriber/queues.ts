import {
  rabbitConnection,
} from '../utils.js'

const queueName = process.env.QUEUE || 'hello'

console.log({
  queueName,
})

const subscriber = async () => {
  const {
    channel,
    onMessage,
  } = await rabbitConnection()

  // create queue if not exists
  const queue = await channel.assertQueue(queueName, {
    durable: true, // default: true
    exclusive: false,
    autoDelete: false,
  })
  console.log({
    queue,
  })

  const consume = await channel.consume(
    queue.queue,
    (message) => onMessage(message, queue.queue),
    {
      // Se debe evitar en la medida de lo posible el valor a true, para prevenir perdida de mensajes
      // noAck: true,
      noAck: false, // default: false // reconocer | confirmar - acknowledgement

      // when you set noAck to true it means automatic acknowledgement of messages, even if the worker is not able to process the message it will be deleted from the queue,

      // when you set noAck to false that means until you manually acknowledge that you have successfully processed/acknowledged the message, it will remain in the queue and after certain amount of time it will be requeued and delivered to a different consumer

      // noAck: false could be used to prevent message loss, but it could also lead to message duplication if the consumer crashes before it has processed a message and the message is redelivered to another consumer.
    }
  )
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
// node --watch --loader ts-paths-esm-loader/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/queues.ts

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/subscriber/queues.ts
