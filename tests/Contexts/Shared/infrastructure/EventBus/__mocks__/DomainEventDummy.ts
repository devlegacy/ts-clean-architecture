import { DomainEvent } from '@/Contexts/Shared/domain'

import { ObjectIdMother } from '../../../domain'

export class DomainEventDummy extends DomainEvent {
  static override readonly EVENT_NAME = 'dummy'

  constructor(data: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data
    super({
      eventName: DomainEventDummy.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    })
  }

  static override fromPrimitives(params: {
    aggregateId: string
    attributes: Record<string, any>
    eventId: string
    occurredOn: Date
  }) {
    const { aggregateId, eventId, occurredOn } = params
    return new DomainEventDummy({
      aggregateId,
      eventId,
      occurredOn,
    })
  }

  toPrimitives() {
    return {}
  }
}

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: ObjectIdMother.random(),
      eventId: ObjectIdMother.random(),
      occurredOn: new Date(),
    })
  }
}
