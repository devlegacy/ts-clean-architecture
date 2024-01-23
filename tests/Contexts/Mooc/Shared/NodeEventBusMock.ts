import assert from 'node:assert/strict'
import { type Mock, mock } from 'node:test'

import { DomainEvent, EventBus } from '@/Contexts/Shared/domain/index.js'
import { DomainEventSubscriberResolver } from '@/Contexts/Shared/infrastructure/EventBus/index.js'

export class NodeEventBusMock implements EventBus {
  private publishSpy: Mock<typeof NodeEventBusMock.prototype.publish> = mock.fn()

  async publish(events: DomainEvent[]): Promise<void> {
    this.publishSpy(events)
  }

  addSubscribers(_subscribers: DomainEventSubscriberResolver): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls
    assert.strictEqual(publishSpyCalls.length > 0, true)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]!

    const lastPublishedEvent = lastPublishSpyCall?.arguments?.[0]?.[0]

    const expected = this.getDataFromDomainEvent(expectedEvent)
    const published = this.getDataFromDomainEvent(lastPublishedEvent!)

    assert.deepStrictEqual(expected, published)
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId: _eventId, occurredOn: _occurredOn, ...attributes } = event

    return attributes
  }
}
