import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/index.js'

import { DomainEventFailoverPublisherDouble } from '../__mocks__/index.js'
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother.js'
import { RabbitMQMikroOrmMongoClientMother } from './RabbitMQMikroOrmMongoClientMother.js'

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMikroOrmMongoClientMother.create()
    return new MikroOrmMongoDomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create())
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble()
  }
}
