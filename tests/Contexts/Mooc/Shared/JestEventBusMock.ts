import { jest } from '@jest/globals'

import { DomainEvent, EventBus } from '@/Contexts/Shared/domain/index.js'
import { DomainEventSubscriberResolver } from '@/Contexts/Shared/infrastructure/EventBus/index.js'

export class JestEventBusMock implements EventBus {
  private publishSpy: any = jest.fn() //jest.Mock<ReturnType<typeof EventBusMock.prototype.publish>, DomainEvent[][], EventBusMock>

  async publish(events: DomainEvent[]): Promise<void> {
    this.publishSpy(events)
  }

  addSubscribers(_subscribers: DomainEventSubscriberResolver): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls
    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]!

    const lastPublishedEvent = lastPublishSpyCall?.[0]?.[0]

    const expected = this.getDataFromDomainEvent(expectedEvent)
    const published = this.getDataFromDomainEvent(lastPublishedEvent)

    expect(expected).toMatchObject(published)
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId: _eventId, occurredOn: _occurredOn, ...attributes } = event

    return attributes
  }
}
