import { RabbitMQConnection, RabbitMQEventBus } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ'
import { CoursesCounterIncrementedDomainEventMother } from '@/tests/Contexts/Mooc/CoursesCounter/domain'

const config = {
  connectionSettings: {
    username: 'inrfebcy',
    password: 'fW-2oZftiwGmxyznJLP-pF2k01m7_DXw',
    vhost: 'inrfebcy',
    connection: {
      secure: false,
      hostname: 'beaver.rmq.cloudamqp.com',
      port: 5672
    }
  },
  exchangeSettings: { name: '' }
}

describe('RabbitMQEventBus test', () => {
  let connection: RabbitMQConnection

  beforeAll(async () => {
    connection = new RabbitMQConnection(config)
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should publish events to RabbitMQ', async () => {
    const eventBus = new RabbitMQEventBus({ connection })

    await eventBus.publish([CoursesCounterIncrementedDomainEventMother.create()])
  })
})
