import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  MikroOrmMongoDomainEventFailoverPublisher,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/index.js'

import {
  DomainEventDeserializerMother,
} from '../__mother__/DomainEventDeserializerMother.js'
import {
  RabbitMQMikroOrmMongoClientMother,
} from '../__mother__/RabbitMQMikroOrmMongoClientMother.js'

export class DomainEventFailoverPublisherDouble extends MikroOrmMongoDomainEventFailoverPublisher {
  private publishMock: jest.Mock
  constructor() {
    super(RabbitMQMikroOrmMongoClientMother.create(), DomainEventDeserializerMother.create())
    this.publishMock = jest.fn()
  }

  override async publish(event: DomainEvent): Promise<void> {
    this.publishMock(event)
  }

  assertEventHasBeenPublished(event: DomainEvent) {
    expect(this.publishMock).toHaveBeenCalledWith(event)
  }
}
