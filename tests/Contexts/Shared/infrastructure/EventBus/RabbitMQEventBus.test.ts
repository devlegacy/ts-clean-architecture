import {
  DomainEventSubscribers,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQEventBus,
  RabbitMQQueueFormatter
} from '@/Contexts/Shared/infrastructure/EventBus'
import { DomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'
import { CoursesCounterIncrementedDomainEventMother } from '@/tests/Contexts/Mooc/CoursesCounter/domain'

import { MongoEnvironmentArranger } from '../mongo/MongoEnvironmentArranger'
import { DomainEventDummyMother, DomainEventSubscriberDummy } from './__mocks__'
import { DomainEventFailoverPublisherMother, RabbitMQConnectionMother, RabbitMQMongoClientMother } from './__mother__'

// jest.useFakeTimers()
jest.setTimeout(5000 + 60000)

// eslint-disable-next-line max-lines-per-function
describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events'

  let arranger: MongoEnvironmentArranger
  const mongoClient = RabbitMQMongoClientMother.create()
  const queueNameFormatter = new RabbitMQQueueFormatter('mooc')

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
        exchange,
        queueNameFormatter,
        maxRetries: 3
      })
      const event = CoursesCounterIncrementedDomainEventMother.create()

      await eventBus.publish([event])

      failoverPublisher.assertEventHasBeenPublished(event)
    })
  })

  // eslint-disable-next-line max-lines-per-function
  describe('integration', () => {
    let connection: RabbitMQConnection
    let dummySubscriber: DomainEventSubscriberDummy
    let configurer: RabbitMQConfigurer
    let failoverPublisher: DomainEventFailoverPublisher
    let subscribers: DomainEventSubscribers

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create()
      failoverPublisher = DomainEventFailoverPublisherMother.create()
      configurer = new RabbitMQConfigurer(connection, queueNameFormatter, 50)

      await arranger.arrange()

      dummySubscriber = new DomainEventSubscriberDummy()
      subscribers = new DomainEventSubscribers([dummySubscriber])
    })

    afterAll(async () => {
      await cleanEnvironment()
      await connection.close()
    })

    it('should consume the events published to RabbitMQ', async () => {
      await configurer.configure({
        exchange,
        subscribers: [dummySubscriber]
      })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries: 3
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([event])

      await dummySubscriber.assertConsumedEvents([event])
    })

    // it('should retry failed domain events', async () => {
    //   dummySubscriber = DomainEventSubscriberDummy.failsFirstTime()
    //   subscribers = new DomainEventSubscribers([dummySubscriber])
    //   await configurer.configure({
    //     exchange,
    //     subscribers: [dummySubscriber]
    //   })
    //   const eventBus = new RabbitMQEventBus({
    //     failoverPublisher,
    //     connection,
    //     exchange,
    //     queueNameFormatter,
    //     maxRetries: 3
    //   })
    //   await eventBus.addSubscribers(subscribers)
    //   const event = DomainEventDummyMother.random()

    //   await eventBus.publish([event])

    //   await dummySubscriber.assertConsumedEvents([event])
    // })

    // it('it should send events to dead letter after retry failed', async () => {
    //   dummySubscriber = DomainEventSubscriberDummy.alwaysFails()
    //   subscribers = new DomainEventSubscribers([dummySubscriber])
    //   await configurer.configure({
    //     exchange,
    //     subscribers: [dummySubscriber]
    //   })
    //   const eventBus = new RabbitMQEventBus({
    //     failoverPublisher,
    //     connection,
    //     exchange,
    //     queueNameFormatter,
    //     maxRetries: 3
    //   })
    //   await eventBus.addSubscribers(subscribers)
    //   const event = DomainEventDummyMother.random()

    //   await eventBus.publish([event])

    //   await dummySubscriber.assertConsumedEvents([])
    //   assertDeadLetter([event])
    // })

    async function cleanEnvironment() {
      await connection.deleteQueue(queueNameFormatter.format(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatRetry(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatDeadLetter(dummySubscriber))
    }

    // async function assertDeadLetter(events: DomainEvent[]) {
    //   const deadLetterQueue = queueNameFormatter.formatDeadLetter(dummySubscriber)
    //   const deadLetterSubscriber = new DomainEventSubscriberDummy()
    //   const deadLetterSubscribers = new DomainEventSubscribers([dummySubscriber])
    //   const deserializer = DomainEventDeserializer.configure(deadLetterSubscribers)
    //   const consumer = new RabbitMQConsumer({
    //     subscriber: deadLetterSubscriber,
    //     deserializer,
    //     connection,
    //     maxRetries: 3,
    //     queueName: deadLetterQueue,
    //     exchange
    //   })
    //   await connection.consume(deadLetterQueue, consumer.onMessage.bind(consumer))

    //   await deadLetterSubscriber.assertConsumedEvents(events)
    // }
  })
})
