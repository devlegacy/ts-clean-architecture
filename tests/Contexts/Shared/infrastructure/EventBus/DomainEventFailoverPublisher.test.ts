import { DomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { MongoEnvironmentArranger } from '../mongo/MongoEnvironmentArranger'
import { DomainEventDummyMother } from './__mocks__'
import { DomainEventDeserializerMother } from './__mother__/DomainEventDeserializerMother'
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother'

jest.setTimeout(5000 + 60000)

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MongoEnvironmentArranger
  const mongoClient = RabbitMQMongoClientMother.create()
  const deserializer = DomainEventDeserializerMother.create()

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(mongoClient)
  })

  beforeEach(async () => {
    await arranger.arrange()
  })

  afterAll(async () => {
    await arranger.close()
  })

  it('should save the published events', async () => {
    const eventBus = new DomainEventFailoverPublisher(mongoClient, deserializer)
    const event = DomainEventDummyMother.random()

    await eventBus.publish(event)

    expect(await eventBus.consume()).toEqual([event])
  })
})
