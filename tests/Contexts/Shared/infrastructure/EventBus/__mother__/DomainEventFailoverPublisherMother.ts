import { DomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { DomainEventFailoverPublisherDouble } from '../__mocks__'
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother'
import { RabbitMQMongoClientMother } from './RabbitMQMongoClientMother'

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMongoClientMother.create()
    return new DomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create())
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble()
  }
}
