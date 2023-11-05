// npx tsnd --transpile-only -r tsconfig-paths/register -r ts-node/register/transpile-only ./src/Contexts/Shared/infrastructure/EventBus/Kafka/demos/publisher/topic.ts
import { Kafka, logLevel, type ProducerRecord } from 'kafkajs'

import { Uuid } from '@/Contexts/Shared/domain/index.js'

import { exitAfterSend, MESSAGES_COUNTER, waitLoop } from '../utils.js'

const queueName = process.env.QUEUE || 'hello'

const kafkaClient = new Kafka({
  clientId: 'hello',
  brokers: ['127.0.0.1:9093'], // Coloca aquí la lista de brokers de Kafka
  logLevel: logLevel.ERROR,
})

const producer = kafkaClient.producer({})

console.log({
  queueName,
})

// Producer
const publisher = async () => {
  await waitLoop(MESSAGES_COUNTER, async () => {
    const message = {
      id: Uuid.random().toString(),
      text: `Hello world! ${new Date().toISOString()}`,
    }
    const buffer = Buffer.from(JSON.stringify(message))

    try {
      await producer.connect()
      const record: ProducerRecord = {
        topic: queueName,
        messages: [
          {
            value: buffer,
          },
        ],
        acks: -1,
      }
      await producer.send(record)
      console.log('Evento publicado:', message)
    } catch (err) {
      console.error('Error al publicar el evento:', err)
    } finally {
      await producer.disconnect()
    }
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
