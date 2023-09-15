import { ObjectId, Uuid } from '../ValueObjects/index.js'

type DomainEventAttributes<T = any> = T
export type DomainPrimitiveAttributes<T extends DomainEvent> = ReturnType<T['toPrimitives']>

/**
 * Create domain event with primitives attributes without event name
 */
export interface DomainEventPrimitivesWithAttributes<Attributes> {
  // event UUID identifier
  eventId: string
  // When the event occurred, with a consistent format across events
  occurredOn: Date
  // ID for the Aggregate Root that this event belongs to, related to the attributes because is the ID root
  aggregateId: string
  // is created in instance of abstract domain event
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
  // eventName: string
  eventId?: string
  occurredOn?: Date
  aggregateId: string
}

// export interface DomainEvent {
//   toPrimitives(): object
// }

/**
 * Base Domain Event class.
 *
 * All Domain Events `MUST` extend this class.
 * Events are made to travel, we need to define serializer (fromPrimitives) and deserializer (toPrimitives)
 */
export abstract class DomainEvent {
  // tag event name: AsyncAPI compliant, it should use action on past
  static EVENT_NAME: string
  /**
   * Event are designed to be transported, so there is a need to define a deserializer
   */
  static fromPrimitives: (
    data: // | { eventId: string; occurredOn: Date; aggregateId: string; attributes: DomainEventAttributes }
    DomainEventPrimitivesWithAttributes<any>
  ) => DomainEvent
  // static fromPrimitives: (props: any) => DomainEvent
  // static fromPrimitives: (props: {
  //   aggregateId: string
  //   eventId: string
  //   occurredOn: Date
  //   attributes: DomainEventAttributes
  // }) => DomainEvent

  readonly aggregateId: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  // DEBT: props vs ctx vs params
  // The event name is needed just here!
  constructor(data: DomainEventPrimitives<{ eventName: string }>) {
    const { aggregateId, eventName, eventId, occurredOn } = data
    this.eventId = eventId || Uuid.random().value || ObjectId.random().value
    this.occurredOn = occurredOn || new Date()

    this.aggregateId = aggregateId
    this.eventName = eventName
  }

  /**
   * Event are designed to be transported, so there is a need to define a serializer
   */
  abstract toPrimitives(): DomainEventAttributes
}

// DEBT: Complexity by "type erasure"
export type DomainEventClass = {
  EVENT_NAME: string
  fromPrimitives(
    data: // | { eventId: string; occurredOn: Date; aggregateId: string; attributes: DomainEventAttributes }
    DomainEventPrimitivesWithAttributes<any>
  ): DomainEvent
  // fromPrimitives(props: any): DomainEvent
  // fromPrimitives(props: {
  //   aggregateId: string
  //   eventId: string
  //   occurredOn: Date
  //   attributes: DomainEventAttributes
  // }): DomainEvent
}

// Works with everything but Decorator
// export type DomainEventClass = typeof DomainEvent
