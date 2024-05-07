import {
  v4,
} from 'uuid'

import {
  MESSAGES_COUNTER, rabbitConnection, waitLoop,
} from '../utils.js'

// Broadcasts
const exchangeName = process.env.EXCHANGE || 'my-fanout'
const exchangeType = 'fanout'

console.log({
  exchangeName,
  exchangeType,
})

const publisher = async () => {
  const {
    channel,
  } = await rabbitConnection()
  const exchange = await channel.assertExchange(exchangeName, exchangeType, {
    durable: true,
  })

  console.log({
    exchange,
  })

  await waitLoop(MESSAGES_COUNTER, async () => {
    const message = {
      id: v4(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const content = Buffer.from(JSON.stringify(message))
    const publish = new Promise((resolve, reject) => {
      const sent = channel.publish(exchangeName, '', content, {
        persistent: true, // + durable: true
        // deliveryMode: 2, // no needed when persistent is true
        messageId: message.id,
        contentType: 'application/json',
        contentEncoding: 'utf-8',
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
      ? `✅ Successfully sent 📤 message 💬 to <${exchangeName}> 🔶 exchange`
      : `❌ Failed to send 📤 sending message 💬 to <${exchangeName}> 🔶 exchange`
    console.log({
      responseStatus,
      event: message,
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
  // exitAfterSend()
}

// publisher()
//   .catch((err) => {
//     console.error(err)
//     process.exit(1)
//   })
//   .finally(() => {
//     exitAfterSend()
//   })

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/fanout-exchange.ts
