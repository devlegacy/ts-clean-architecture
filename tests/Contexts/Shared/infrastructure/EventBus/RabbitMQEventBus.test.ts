import { RabbitMQConnection, RabbitMQEventBus } from '@/Contexts/Shared/infrastructure/EventBus'
import { CoursesCounterIncrementedDomainEventMother } from '@/tests/Contexts/Mooc/CoursesCounter/domain'

import { MongoEnvironmentArranger } from '../mongo/MongoEnvironmentArranger'
import { DomainEventFailoverPublisherMother, RabbitMQConnectionMother, RabbitMQMongoClientMother } from './__mother__'

// jest.useFakeTimers()
// jest.setTimeout(60000)

// eslint-disable-next-line max-lines-per-function
describe('RabbitMQEventBus test', () => {
  const exchange = 'amq.topic'

  let arranger: MongoEnvironmentArranger
  const mongoClient = RabbitMQMongoClientMother.create()

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(mongoClient)
  })

  beforeEach(async () => {
    await arranger.arrange()
  })

  afterAll(async () => {
    await arranger.close()
  })

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = RabbitMQConnectionMother.failOnPublish()
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble()
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange
      })
      const event = CoursesCounterIncrementedDomainEventMother.create()

      await eventBus.publish([event])
      failoverPublisher.assertEventHasBeenPublished(event)
    })
  })

  describe('integration', () => {
    let connection: RabbitMQConnection

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create()
    })

    afterAll(async () => {
      await connection.close()
    })

    it('should publish events to RabbitMQ', async () => {
      const failoverPublisher = DomainEventFailoverPublisherMother.create()
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange
      })

      await eventBus.publish([CoursesCounterIncrementedDomainEventMother.create()])
    })
  })
})
