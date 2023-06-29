import amqplib from 'amqplib'

import { intensiveOperation } from '../utils'

const queueName = process.env.QUEUE || 'hello'

console.log({
  queueName,
})

const subscriber = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const queue = await channel.assertQueue(queueName, {
    durable: true, // default: true
  })

  console.log(queue)

  const consume = await channel.consume(
    queueName,
    (message) => {
      if (!message) return
      // console.log(message)
      const content = JSON.parse(message.content.toString())
      intensiveOperation()
      // con el noAck pueden haber duplicados
      console.log(`Received message from <${queueName}> queue`, content)

      channel.ack(message) // confirm and delete
    },
    {
      // Se debe evitar en la medida de lo posible el valor a true, para prevenir perdida de mensajes
      // noAck: true,
      noAck: false, // default: false // reconocer | confirmar

      // when you set noAck to true it means automatic acknowledgement of messages, even if the worker is not able to process the message it will be deleted from the queue,

      // when you set noAck to false that means until you manually acknowledge that you have successfully processed/acknowledged the message, it will remain in the queue and after certain amount of time it will be requeued and delivered to a different consumer
    }
  )
  console.log(consume)
}

subscriber().catch((err) => {
  console.error(err)
  process.exit(1)
})
