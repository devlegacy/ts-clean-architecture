// npx tsnd --transpile-only -r tsconfig-paths/register -r ts-node/register/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/Kafka/demos/subscriber/topic-2.ts

import { type Consumer, type EachMessagePayload, Kafka, logLevel } from 'kafkajs'

import { intensiveOperation } from '../utils.js'

const queueName = process.env.QUEUE || 'user.registered'

const KAFKA_APP_ID = 'coliseum' // 'hello'
const KAFKA_ENDPOINT = 'romantic-killdeer-7848-us1-kafka.upstash.io:9092' // '127.0.0.1:9093'
const KAFKA_USERNAME = 'cm9tYW50aWMta2lsbGRlZXItNzg0OCQU_bQFtTZbPd9kaUtqe_PFZnIy9hjHOPU'
const KAFKA_PASSWORD = '8b88867a968842d9a2909e93a64fcd11'
// const KAFKA_GROUP_ID = 'coliseum'
const KAFKA_GROUP_ID = 'tmp-auth-1'
const kafkaClient = new Kafka({
  clientId: KAFKA_APP_ID,
  brokers: [KAFKA_ENDPOINT],
  logLevel: logLevel.ERROR,
  sasl: {
    mechanism: 'scram-sha-256',
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
  },
  ssl: true,
})

console.log({
  queueName,
})
const consumer: Consumer = kafkaClient.consumer({ groupId: KAFKA_GROUP_ID }) // Cambia el groupId a uno significativo

const subscriber = async () => {
  await consumer.connect()
  await consumer.subscribe({
    topic: queueName,
    fromBeginning: true,
  })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log('message', message)
      const { value } = message
      if (!value) return
      const content = JSON.parse(value.toString())
      intensiveOperation()
      console.log(`Received message from <${topic}> queue, partition <${partition}>`, content)
      // consumer.commitOffsets([
      //   {
      //     topic,
      //     partition,
      //     offset: `${+message.offset + 1}`,
      //   },
      // ])
    },
  })
}

subscriber().catch((err) => {
  console.error(err)
  process.exit(1)
})
