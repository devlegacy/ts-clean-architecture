import amqplib from 'amqplib'

import { Uuid } from '@/Contexts/Shared/domain/index.js'

import { exitAfterSend, MESSAGES_COUNTER, waitLoop } from '../utils.js'

const queueName = process.env.QUEUE || 'hello'

console.log({
  queueName,
})

const publisher = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const queue = await channel.assertQueue(queueName, {
    durable: true, // default: true
  })

  console.log(queue)

  await waitLoop(MESSAGES_COUNTER, () => {
    const message = {
      id: Uuid.random().toString(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const buffer = Buffer.from(JSON.stringify(message))

    const sent = channel.sendToQueue(queueName, buffer, {
      persistent: true, // + durable: true
    })

    const responseStatus = sent
      ? `Sent message to <${queueName}> queue`
      : `Fails sending message to <${queueName}> queue`
    console.log(responseStatus, message)
  })
}

publisher()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    exitAfterSend()
  })
