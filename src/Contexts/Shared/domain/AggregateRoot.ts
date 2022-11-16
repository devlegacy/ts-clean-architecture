import { DomainEvent } from './DomainEvent'

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
