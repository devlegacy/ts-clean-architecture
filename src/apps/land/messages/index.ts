import Redis from 'ioredis'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'land',
  brokers: ['127.0.0.1:9093'],
  // logLevel: 5,
})

const client = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'SUPER_SECRET_PASSWORD',
})

// const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'group1' })

const run = async () => {
  // Producing
  // await producer.connect()
  // await producer.send({
  //   topic: 'test-topic',
  //   messages: [{ value: 'Hello KafkaJS user!' }],
  // })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({
    topic: /^fulfillment\.public\./,
    // topic: 'fulfillment.public.blocks',
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ topic: _, partition, message }) => {
      const event: Record<string, any> = JSON.parse(message?.value?.toString() || '{}')
      const { payload } = event
      const operation = payload.op as string
      const table = payload.source.table as string
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
        operation,
        table,
      })

      if (operation === 'u') {
        //update after
      } else if (operation === 'c') {
        console.log({ data: payload.after })
        await client.set(table, JSON.stringify(payload.after))
        const stored: any = await client.get(table)
        console.log(JSON.parse(stored))
      } else if (operation === 'd') {
        // delete before
      }
    },
  })
}

run().catch(console.error)
// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/land/messages/index.ts
