import { ObjectId, Uuid } from '../ValueObjects'

type DomainEventAttributes<T = any> = T

export type DomainPrimitiveAttributes<T extends DomainEvent> = ReturnType<T['toPrimitives']>

export interface DomainEventPrimitivesWithAttributes<Attributes> {
  // event UUID identifier
  eventId: string
  // When the event occurred, with a consistent format across events
  occurredOn: Date
  // ID for the Aggregate Root that this event belongs to, related to the attributes because is the ID root
  aggregateId: string
  //
  // eventName: string
  // Primitive domain data | Payload domain data
  attributes: Simplify<
    Attributes extends DomainEvent
      ? DomainPrimitiveAttributes<Attributes>
      : { [Property in keyof Attributes]: Attributes[Property] }
  >
  // Meta, host, etc.
}

// Base (?)
export type DomainEventPrimitives<Attributes> = Attributes & {
  eventId?: string
  occurredOn?: Date
  aggregateId: string
  // eventName: string
}

// export interface DomainEvent {
//   toPrimitives(): object
// }

/**
 * Base Domain Event class.
 *
 * All Domain Events `MUST` extend this class.
 */
export abstract class DomainEvent {
  // tag event name: AsyncAPI compliant, it should use action on past
  static EVENT_NAME: string
  // static fromPrimitives: (props: DomainEventPrimitivesWithAttributes) => DomainEvent
  static fromPrimitives: (props: any) => DomainEvent

  readonly aggregateId: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  // DEBT: props vs ctx
  constructor(props: DomainEventPrimitives<{ eventName: string }>) {
    const { aggregateId, eventName, eventId, occurredOn } = props
    this.aggregateId = aggregateId
    this.eventId = eventId || Uuid.random().value || ObjectId.random().value
    this.occurredOn = occurredOn || new Date()
    this.eventName = eventName
  }

  abstract toPrimitives(): DomainEventAttributes
}

// DEBT: Complexity
export type DomainEventClass = {
  EVENT_NAME: string
  // fromPrimitives(props: DomainEventPrimitivesWithAttributes): DomainEvent
  fromPrimitives(props: any): DomainEvent
}
