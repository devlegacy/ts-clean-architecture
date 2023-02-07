import { DomainError } from './DomainError'
import { DomainEvent } from './Events/DomainEvent'
/**
 * A cluster of associated objects which act as a single unit for the purpose of data changes.
 * Each `Aggregate` has a single root and then a boundary which defines what the `Aggregate` is responsible for.
 *
 * ## Rules
 * - The `Aggregate Root` is a single, specific `Entity`;
 * - The `Aggregate Root` is the only object that outside objects are allow to reference;
 * - The `Aggregate Root` is responsible for enforcing consistency rules within the boundary;
 */
export abstract class AggregateRoot {
  static fromPrimitives: (args: any) => AggregateRoot
  private domainEvents: DomainEvent[] = []

  constructor() {
    this.domainEvents = []
    if (!(this.constructor as typeof AggregateRoot).fromPrimitives)
      throw new DomainError(`${this.constructor.name} fromPrimitives must be implemented`)
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice()
    this.domainEvents = []

    return domainEvents
  }

  /**
   * @description Add the domain event to this aggregate's list of domain events
   * @param event
   */
  record(event: DomainEvent) {
    // DEBT: In test is undefined
    if (!this.domainEvents) this.domainEvents = []

    this.domainEvents.push(event)
  }

  abstract toPrimitives(): any
}
