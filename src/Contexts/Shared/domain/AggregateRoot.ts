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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class AggregateRoot<Entity = any, Primitives = any> {
  protected deletedAt?: Date
  private domainEvents: DomainEvent[] = []

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice()
    this.domainEvents = []
    return domainEvents
  }

  record(event: DomainEvent) {
    // DEBT: In test is undefined
    if (!this.domainEvents) this.domainEvents = []

    this.domainEvents.push(event)
  }

  delete() {
    if (this.deletedAt) return
    this.deletedAt = new Date()
  }

  abstract toPrimitives(): Primitives
}
