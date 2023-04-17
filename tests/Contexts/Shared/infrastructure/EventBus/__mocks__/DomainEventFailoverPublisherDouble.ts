import { DomainEvent } from '@/Contexts/Shared/domain'
import { MikroOrmMongoDomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher'

import { DomainEventDeserializerMother } from '../__mother__/DomainEventDeserializerMother'
import { RabbitMQMikroOrmMongoClientMother } from '../__mother__/RabbitMQMikroOrmMongoClientMother'

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
