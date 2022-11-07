import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { DomainEventFailoverPublisherDouble } from '../__mocks__'
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother'
import { RabbitMQMikroOrmMongoClientMother } from './RabbitMQMikroOrmMongoClientMother'

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMikroOrmMongoClientMother.create()
    return new MikroOrmMongoDomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create())
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble()
  }
}
