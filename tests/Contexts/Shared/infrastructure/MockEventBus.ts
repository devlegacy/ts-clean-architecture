import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import {
  DomainEvent,
  type DomainEventSubscribers,
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'

export class MockEventBus implements EventBus {
  private readonly mockPublish: Mock<typeof EventBus.prototype.publish> = mock.fn()

  addSubscribers(_subscribers: DomainEventSubscribers): void {
    throw new Error('Method not implemented.')
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const expectedCalls = this.mockPublish.mock.calls
    if (expectedCalls.length > 0) {
      const [
        expectedEvents,
      ] = this.mockPublish.mock.calls?.[0]?.arguments as DomainEvent[][] // arguments?.[0]
      assert.equal(expectedEvents!.length, events.length, 'number of events does not match')
      for (let i = 0; i < expectedEvents!.length; i++) {
        const expectedEvent = expectedEvents?.[i] as DomainEvent
        const actualEvent = events?.[i] as DomainEvent

        // assert.notEqual(expectedEvent, actualEvent)
        assert.deepEqual(
          {
            ...expectedEvent?.toPrimitives(),
            occurredOn: undefined,
            eventId: undefined,
          },
          {
            ...actualEvent?.toPrimitives(),
            occurredOn: undefined,
            eventId: undefined,
          },
        )
      }
    }
    // expect(this.mockPublish).toHaveBeenCalledWith(
    //   expect.arrayContaining(
    //     events.map((event) =>
    //       expect.objectContaining({
    //         ...event,
    //         occurredOn: expect.anything(),
    //         eventId: expect.anything(),
    //       })),
    //   ),
    // )

    await Promise.resolve()
  }

  shouldPublish(events: DomainEvent[]): void {
    this.mockPublish(events)
  }
}
