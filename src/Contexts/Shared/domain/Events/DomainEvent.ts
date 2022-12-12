import { ObjectId } from '../value-object'

export interface IDomainEvent {
  // id for the Aggregate Root that this event belongs to
  aggregateId: string
  // event UUID identifier
  eventId: string
  // When the event occurred, with a consistent format across events
  occurredOn: Date
  // Primitive domain data
  attributes: DomainEventAttributes
  // Meta, host, etc.
}

/**
 * Base Domain Event class.
 *
 * All Domain Events `MUST` extend this class.
 */
export abstract class DomainEvent {
  // tag event name: AsyncAPI compliant, it should use action on past
  static EVENT_NAME: string
  static fromPrimitives: (props: IDomainEvent) => DomainEvent

  readonly aggregateId: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  // DEBT: props vs ctx
  constructor(props: { eventName: string; aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventName, eventId, occurredOn } = props
    this.aggregateId = aggregateId
    this.eventId = eventId || ObjectId.random().value
    this.occurredOn = occurredOn || new Date()
    this.eventName = eventName
  }

  abstract toPrimitives(): DomainEventAttributes
}

// DEBT: Complexity
export type DomainEventClass = {
  EVENT_NAME: string
  fromPrimitives(props: IDomainEvent): DomainEvent
}

type DomainEventAttributes<T = any> = T
