import { type DomainEventClass, type DomainEventSubscribers, EVENTS_HANDLER_METADATA } from '../../domain/index.js'

type DomainEventJSON = {
  id: string // eventId
  type: string // eventName
  occurredOn: string
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
    const { id: eventId, type, occurredOn, aggregateId, attributes } = eventData
    const eventClass = super.get(type)

    if (!eventClass) throw Error(`DomainEvent mapping not found for event <${type}>`)
    const primitives = {
      eventId,
      occurredOn: new Date(occurredOn),
      aggregateId,
      attributes,
    }
    return eventClass.fromPrimitives(primitives)
  }

  #registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME
    this.set(eventName, domainEvent)
  }
}
