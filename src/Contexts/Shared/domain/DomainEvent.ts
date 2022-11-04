import { Id } from './value-object'

export abstract class DomainEvent {
  static EVENT_NAME: string
  static fromPrimitives: (props: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: DomainEventAttributes
  }) => DomainEvent

  readonly aggregateId: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  constructor(props: { eventName: string; aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventName, eventId, occurredOn } = props
    this.aggregateId = aggregateId
    this.eventId = eventId || Id.random().value
    this.occurredOn = occurredOn || new Date()
    this.eventName = eventName
  }

  abstract toPrimitives(): DomainEventAttributes
}

export type DomainEventClass = {
  EVENT_NAME: string
  fromPrimitives(props: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: DomainEventAttributes
  }): DomainEvent
}

type DomainEventAttributes = any
