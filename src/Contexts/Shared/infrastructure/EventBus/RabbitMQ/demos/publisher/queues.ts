import { Uuid } from '@/Contexts/Shared/domain/index.js'

import { MESSAGES_COUNTER, rabbitConnection, waitLoop } from '../utils.js'

const queue = process.env.QUEUE || 'hello'

console.log({
  queue,
})

const publisher = async () => {
  const { channel } = await rabbitConnection()
  const assertQueue = await channel.assertQueue(queue, {
    durable: true, // default: true
    exclusive: false,
    autoDelete: false,
  })
  console.log(assertQueue)

  await waitLoop(MESSAGES_COUNTER, () => {
    const message = {
      id: Uuid.random().toString(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const content = Buffer.from(JSON.stringify(message))

    // skip routing, send directly to queue
    const sent = channel.sendToQueue(queue, content, {
      persistent: true, // + durable: true
      messageId: message.id,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    })

    const responseStatus = sent ? `Sent message to <${queue}> queue` : `Fails sending message to <${queue}> queue`
    console.log(responseStatus, message)
  })
}

// publisher()
//   .catch((err) => {
//     console.error(err)
//     process.exit(1)
//   })
//   .finally(() => {
//     exitAfterSend()
//   })
try {
  await publisher()
} catch (err) {
  console.error(err)
  process.exit(1)
} finally {
  console.log('finally')
}
// node --watch --loader ts-paths-esm-loader/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/queues.ts
