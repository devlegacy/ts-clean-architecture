import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { MikroOrmMongoEnvironmentArranger } from '../mikroorm/MikroOrmMongoEnvironmentArranger'
import { DomainEventDummyMother } from './__mocks__'
import { DomainEventDeserializerMother } from './__mother__/DomainEventDeserializerMother'
import { RabbitMQMikroOrmMongoClientMother } from './__mother__/RabbitMQMikroOrmMongoClientMother'

jest.setTimeout(5000 + 60000)

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MikroOrmMongoEnvironmentArranger
  const mongoClient = RabbitMQMikroOrmMongoClientMother.create()
  const deserializer = DomainEventDeserializerMother.create()

  beforeAll(async () => {
    arranger = new MikroOrmMongoEnvironmentArranger(mongoClient)
  })

  beforeEach(async () => {
    await arranger.arrange()
  })

  afterAll(async () => {
    await arranger.close()
  })

  it('should save the published events', async () => {
    const eventBus = new MikroOrmMongoDomainEventFailoverPublisher(mongoClient, deserializer)
    const event = DomainEventDummyMother.random()

    await eventBus.publish(event)

    expect(await eventBus.consume()).toEqual([event])
  })
})
