import {
  EVENT,
  MESSAGES_COUNTER,
  rabbitConnection,
  waitLoop,
} from '../utils.js'

const exchangeName = process.env.EXCHANGE || 'my-topic'
const routingKey = process.env.ROUTING_KEY || ''
const exchangeType = 'topic'
const eventName = (process.env.EVENT_NAME || 'message.created') as keyof typeof EVENT

console.log({
  exchangeName,
  routingKey,
  exchangeType,
  eventName,
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
  // bind to queue to guarantee that the message is sent
  await waitLoop(MESSAGES_COUNTER, async () => {
    const event = EVENT[`${eventName}`]()
    const content = Buffer.from(JSON.stringify(event))
    const publish = new Promise((resolve, reject) => {
      const sent = channel.publish(exchangeName, routingKey || event.data.type, content, {
        persistent: true, // + durable: true
        contentType: 'application/json',
        contentEncoding: 'utf-8',
        // to avoid duplicates
        messageId: event.data.id,
        timestamp: new Date(event.data.occurredOn).getTime(),
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
      // message | event | content
      event,
      sent,
    })
    if (!sent) {
      // fail over implementation
      // throw new Error(responseStatus)
    }
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

// bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/topic-exchange.ts

// EVENT_NAME=user.created EXCHANGE=domain_events bun --watch ./src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/demos/publisher/topic-exchange.ts
