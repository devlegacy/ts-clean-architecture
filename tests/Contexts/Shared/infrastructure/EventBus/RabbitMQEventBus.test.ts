import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  DomainEventDeserializer,
  DomainEventSubscriberResolver,
  MikroOrmMongoDomainEventFailoverPublisher,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQConsumer,
  RabbitMQEventBus,
  RabbitMQQueueFormatter,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/index.js'
import {
  CoursesCounterIncrementedDomainEventMother,
} from '#@/tests/Contexts/Mooc/CoursesCounter/domain/index.js'

import {
  MikroOrmMongoEnvironmentArranger,
} from '../mikroorm/MikroOrmMongoEnvironmentArranger.js'
import {
  DomainEventDummyMother, DomainEventSubscriberDummy,
} from './__mocks__/index.js'
import {
  DomainEventFailoverPublisherMother,
  RabbitMQConnectionMother,
  RabbitMQMikroOrmMongoClientMother,
} from './__mother__/index.js'

// jest.useFakeTimers()
jest.setTimeout(5000 + 60000)

describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events'
  const maxRetries = 3

  let arranger: MikroOrmMongoEnvironmentArranger
  const mongoClient = RabbitMQMikroOrmMongoClientMother.create()
  const queueNameFormatter = new RabbitMQQueueFormatter('mooc')

  beforeAll(async () => {
    arranger = new MikroOrmMongoEnvironmentArranger(mongoClient as unknown as Awaited<typeof mongoClient>)
  })

  beforeEach(async () => {
    await arranger.arrange()
  })

  afterAll(async () => {
    await arranger.arrange()
    await arranger.close()
  })

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      expect.assertions(1)

      const connection = RabbitMQConnectionMother.failOnPublish()
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble()
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries,
      })
      const event = CoursesCounterIncrementedDomainEventMother.create()

      await eventBus.publish([
        event,
      ])

      failoverPublisher.assertEventHasBeenPublished(event)
    })
  })

  describe('integration', () => {
    let connection: RabbitMQConnection
    let dummySubscriber: DomainEventSubscriberDummy
    let configurer: RabbitMQConfigurer
    let failoverPublisher: MikroOrmMongoDomainEventFailoverPublisher
    let subscribers: DomainEventSubscriberResolver
    async function cleanEnvironment() {
      await connection.deleteQueue(queueNameFormatter.format(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatRetry(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatDeadLetter(dummySubscriber))
    }

    async function assertDeadLetter(events: DomainEvent[]) {
      expect.assertions(2)
      const deadLetterQueue = queueNameFormatter.formatDeadLetter(dummySubscriber)
      const deadLetterSubscriber = new DomainEventSubscriberDummy()
      const deadLetterSubscribers = new DomainEventSubscriberResolver([
        dummySubscriber,
      ])
      const deserializer = DomainEventDeserializer.configure(deadLetterSubscribers)
      const consumer = new RabbitMQConsumer({
        subscriber: deadLetterSubscriber,
        deserializer,
        connection,
        maxRetries,
        queueName: deadLetterQueue,
        exchange,
      })
      await connection.consume(deadLetterQueue, consumer.onMessage.bind(consumer))

      await deadLetterSubscriber.assertConsumedEvents(events)
    }

    beforeEach(async () => {
      connection = await RabbitMQConnectionMother.create()
      failoverPublisher = DomainEventFailoverPublisherMother.create()
      configurer = new RabbitMQConfigurer(connection, queueNameFormatter, 50)

      await arranger.arrange()

      dummySubscriber = new DomainEventSubscriberDummy()
      subscribers = new DomainEventSubscriberResolver([
        dummySubscriber,
      ])
    })

    afterEach(async () => {
      await cleanEnvironment()
      await connection.close()
    })

    it('should publish events to RabbitMQ', async () => {
      expect.assertions(0)

      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange: '', // exchange
        queueNameFormatter,
        maxRetries,
      })

      const event = CoursesCounterIncrementedDomainEventMother.create()

      await eventBus.publish([
        event,
      ])
    })

    it('should consume the events published to RabbitMQ', async () => {
      expect.assertions(2)

      await configurer.configure({
        exchange,
        subscribers: [
          dummySubscriber,
        ],
      })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([
        event,
      ])

      await dummySubscriber.assertConsumedEvents([
        event,
      ])
    })

    it('should retry failed domain events', async () => {
      expect.assertions(2) // should be 4
      dummySubscriber = DomainEventSubscriberDummy.failsFirstTime()
      subscribers = new DomainEventSubscriberResolver([
        dummySubscriber,
      ])
      await configurer.configure({
        exchange,
        subscribers: [
          dummySubscriber,
        ],
      })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([
        event,
      ])

      await dummySubscriber.assertConsumedEvents([
        event,
      ])
    })

    it('should send events to dead letter after retry failed', async () => {
      expect.assertions(2)
      dummySubscriber = DomainEventSubscriberDummy.alwaysFails()
      subscribers = new DomainEventSubscriberResolver([
        dummySubscriber,
      ])
      await configurer.configure({
        exchange,
        subscribers: [
          dummySubscriber,
        ],
      })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([
        event,
      ])

      await dummySubscriber.assertConsumedEvents([])
      assertDeadLetter([
        event,
      ])
    })
  })
})
