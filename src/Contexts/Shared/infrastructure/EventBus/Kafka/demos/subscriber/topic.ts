// npx tsnd --transpile-only -r tsconfig-paths/register -r ts-node/register/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/Kafka/demos/subscriber/topic.ts

import { Consumer, EachMessagePayload, Kafka, logLevel } from 'kafkajs'

import { intensiveOperation } from '../utils'

const queueName = process.env.QUEUE || 'hello'

const kafkaClient = new Kafka({
  clientId: 'hello',
  brokers: ['127.0.0.1:9093'], // Coloca aquí la lista de brokers de Kafka
  logLevel: logLevel.ERROR,
})

console.log({
  queueName,
})
const consumer: Consumer = kafkaClient.consumer({ groupId: 'hello' }) // Cambia el groupId a uno significativo

const subscriber = async () => {
  await consumer.connect()
  await consumer.subscribe({
    topic: queueName,
    fromBeginning: true,
  })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      const { value } = message
      if (!value) return
      const content = JSON.parse(value.toString())
      intensiveOperation()
      console.log(`Received message from <${topic}> queue, partition <${partition}>`, content)
      consumer.commitOffsets([
        {
          topic,
          partition,
          offset: `${+message.offset + 1}`,
        },
      ])
    },
  })
}

subscriber().catch((err) => {
  console.error(err)
  process.exit(1)
})
