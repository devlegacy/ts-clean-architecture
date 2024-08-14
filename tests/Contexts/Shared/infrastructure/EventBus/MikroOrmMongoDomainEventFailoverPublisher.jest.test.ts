import {
  describe,
  expect,
  it,
  jest,
} from '@jest/globals'

import {
  MikroOrmMongoDomainEventFailoverPublisher,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/index.js'

import {
  MikroOrmMongoEnvironmentArranger,
} from '../mikroorm/MikroOrmMongoEnvironmentArranger.js'
import {
  DomainEventDummyMother,
} from './__mocks__/DomainEventDummyMother.js'
import {
  DomainEventDeserializerMother,
} from './__mother__/DomainEventDeserializerMother.js'
import {
  RabbitMQMikroOrmMongoClientMother,
} from './__mother__/RabbitMQMikroOrmMongoClientMother.js'

jest.setTimeout(5000 + 60000)

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MikroOrmMongoEnvironmentArranger
  const mongoClient = RabbitMQMikroOrmMongoClientMother.create()
  const deserializer = DomainEventDeserializerMother.create()

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

  it('should save the published events', async () => {
    const eventBus = new MikroOrmMongoDomainEventFailoverPublisher(mongoClient, deserializer)
    const event = DomainEventDummyMother.random()

    await eventBus.publish(event)

    expect(await eventBus.consume()).toEqual([
      event,
    ])
  })
})
