import {
  EVENT, MESSAGES_COUNTER, rabbitConnection, waitLoop,
} from '../utils.js'

// user_events
const queueName = process.env.QUEUE || 'hello'
const eventName = (process.env.EVENT_NAME || 'message.created') as keyof typeof EVENT

console.log({
  queueName,
  eventName,
})

const publisher = async () => {
  const {
    channel,
  } = await rabbitConnection()
  const queue = await channel.assertQueue(queueName, {
    durable: true, // default: true
    exclusive: false,
    autoDelete: false,
  })
  console.log({
    queue,
  })

  await waitLoop(MESSAGES_COUNTER, async () => {
    const event = EVENT[`${eventName}`]()
    const content = Buffer.from(JSON.stringify(event))

    // skip routing, send directly to queue, bypass
    const publish = new Promise((resolve, reject) => {
      const sent = channel.sendToQueue(queue.queue, content, {
        persistent: true, // + durable: true
        contentType: 'application/json',
        contentEncoding: 'utf-8',
        messageId: event.data.id,
        timestamp: new Date(event.data.occurredOn).getTime(),
      // type: 'message.created', // event name from aggregate user.created
      // mandatory // if no queue is bound to the exchange, the message is returned, obligatorio
      }, (error, ok) => {
        error
          ? reject(error)
          : resolve({
            sent,
            ok,
          })
      })
    })

    const sent = await publish

    const responseStatus = sent
      ? `✅ Successfully sent 📤 message 💬 to <${queue.queue}> 🟦 queue`
      : `❌ Failed to send 📤 sending message 💬 to <${queue.queue}> 🟦 queue`
    console.log({
      responseStatus,
      // message | event | content
      event,
      sent,
    })
  })
}

try {
  await publisher()
}
catch (err) {
  console.error(err)
  process.exit(1)
}
finally {
  console.log('finally 🔚')
}

// publisher()
//   .catch((err) => {
//     console.error(err)
//     process.exit(1)
//   })
//   .finally(() => {
//     exitAfterSend()
//   })

// node --watch --loader ts-paths-esm-loader/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/queues.ts

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/queues.ts
