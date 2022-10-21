import { DomainEvent, EventBus } from '@/Contexts/Shared/domain'
import { DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus'

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn()

  async publish(events: DomainEvent[]) {
    this.publishSpy(events)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addSubscribers(_subscribers: DomainEventSubscribers): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const [[lastPublishedEvent]] = lastPublishSpyCall

    const expected = this.getDataFromDomainEvent(expectedEvent)
    const published = this.getDataFromDomainEvent(lastPublishedEvent)

    expect(expected).toMatchObject(published)
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event

    return attributes
  }
}
