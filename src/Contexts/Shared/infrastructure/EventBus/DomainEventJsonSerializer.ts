import { DomainEvent } from '../../domain/index.js'

export class DomainEventJsonSerializer {
  static serialize(event: DomainEvent): string {
    const data = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurredOn: event.occurredOn.toISOString(),
        aggregateId: event.aggregateId,
        attributes: event.toPrimitives(),
      },
      meta: {},
    }
    const serialize = JSON.stringify(data)
    return serialize
  }
}
