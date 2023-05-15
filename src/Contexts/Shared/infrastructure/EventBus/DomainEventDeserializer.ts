import { DomainEventClass, DomainEventSubscribers, EVENTS_HANDLER_METADATA } from '../../domain'

type DomainEventJSON = {
  id: string // eventId
  type: string // eventName
  occurred_on: string
  aggregateId: string
  attributes: Record<string, unknown>
}

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer()
    subscribers.items.forEach((subscriber) => {
      const events: DomainEventClass[] = Reflect.getMetadata(EVENTS_HANDLER_METADATA, subscriber.constructor) ?? []

      events.forEach(mapping.#registerEvent.bind(mapping))
    })

    return mapping
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON
    const { id: eventId, type, occurred_on, aggregateId, attributes } = eventData
    const eventClass = super.get(type)

    if (!eventClass) throw Error(`DomainEvent mapping not found for event <${type}>`)

    return eventClass.fromPrimitives({
      eventId,
      occurredOn: new Date(occurred_on),
      aggregateId,
      attributes,
    })
  }

  #registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME
    this.set(eventName, domainEvent)
  }
}
