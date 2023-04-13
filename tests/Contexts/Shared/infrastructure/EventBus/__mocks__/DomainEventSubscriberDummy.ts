import { DomainEvent, DomainEventClass, IDomainEventSubscriber } from '@/Contexts/Shared/domain'

import { DomainEventDummy } from './DomainEventDummy'

export class DomainEventSubscriberDummy implements IDomainEventSubscriber<DomainEventDummy> {
  private events: DomainEvent[]
  private failsFirstTime = false
  private alwaysFails = false
  private alreadyFailed = false

  constructor(params?: { failsFirstTime?: boolean; alwaysFails?: boolean }) {
    if (params?.failsFirstTime) {
      this.failsFirstTime = true
    }
    if (params?.alwaysFails) {
      this.alwaysFails = true
    }

    this.events = []
  }

  static failsFirstTime() {
    return new DomainEventSubscriberDummy({ failsFirstTime: true })
  }

  static alwaysFails() {
    return new DomainEventSubscriberDummy({ alwaysFails: true })
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy]
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    if (this.alwaysFails) {
      throw new Error()
    }

    if (!this.alreadyFailed && this.failsFirstTime) {
      this.alreadyFailed = true
      throw new Error()
    }

    this.events.push(domainEvent)
  }

  async assertConsumedEvents(events: DomainEvent[]) {
    return new Promise((resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => {
      setTimeout(() => {
        try {
          expect(this.events).toHaveLength(events.length)
          expect(this.events).toEqual(events)
          resolve()
        } catch (error: any) {
          reject(error)
        }
      }, 400)
    })
  }
}
