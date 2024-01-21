// Broadcasts

import { Uuid } from '@/Contexts/Shared/domain/index.js'

import { exitAfterSend, MESSAGES_COUNTER, rabbitConnection, waitLoop } from '../utils.js'

const exchangeName = process.env.EXCHANGE || 'my-fanout'
const exchangeType = 'fanout'

console.log({
  exchangeName,
  exchangeType,
})

const publisher = async () => {
  const { channel } = await rabbitConnection()
  await channel.assertExchange(exchangeName, exchangeType, {
    durable: true,
  })

  await waitLoop(MESSAGES_COUNTER, () => {
    const message = {
      id: Uuid.random().toString(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const buffer = Buffer.from(JSON.stringify(message))

    const sent = channel.publish(exchangeName, '', buffer, {
      persistent: true, // + durable: true
      // deliveryMode: 2, // no needed when persistent is true
      messageId: message.id,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    })

    const responseStatus = sent
      ? `Sent message to <${exchangeName}> exchange`
      : `Fails sending message to <${exchangeName}> exchange`
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
  exitAfterSend()
}
