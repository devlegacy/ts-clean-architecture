import { DomainEvent, type DomainEventPrimitivesWithAttributes } from '@/Contexts/Shared/domain/index.js'

interface CoursesCounterIncrementedDomainEventAttributes {
  readonly total: number
}

export class CoursesCounterIncrementedDomainEvent
  extends DomainEvent
  implements CoursesCounterIncrementedDomainEventAttributes
{
  static override readonly EVENT_NAME = 'courses_counter.incremented'
  readonly total: number

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data
    super({
      eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    })
    this.total = data.total
  }

  static override fromPrimitives(
    params: DomainEventPrimitivesWithAttributes<CoursesCounterIncrementedDomainEventAttributes>,
  ) {
    const { eventId, occurredOn, aggregateId, attributes } = params
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn,
    })
  }

  toPrimitives() {
    const primitives = {
      total: this.total,
    }
    return primitives
  }
}
