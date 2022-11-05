import { DomainEvent } from '@/Contexts/Shared/domain'

import { IdMother } from '../../../domain'

export class DomainEventDummy extends DomainEvent {
  static readonly EVENT_NAME = 'dummy'

  constructor(data: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data
    super({
      eventName: DomainEventDummy.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: Record<string, any>
    eventId: string
    occurredOn: Date
  }) {
    const { aggregateId, eventId, occurredOn } = params
    return new DomainEventDummy({
      aggregateId,
      eventId,
      occurredOn
    })
  }

  toPrimitives() {
    return {}
  }
}

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: IdMother.random(),
      eventId: IdMother.random(),
      occurredOn: new Date()
    })
  }
}
